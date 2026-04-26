const AWS = require("aws-sdk");

AWS.config.update({ region: 'eu-central-1' });

const ec2 = new AWS.EC2();

const task = function (request, callback) {

    const params = {
        InstanceIds: [ request.query.instanceId ]
    };

    ec2.describeInstances(params, function(err, data) {
        if (err) {
            console.log("Błąd pobierania danych z API AWS:", err);
            callback(err);
        } else {
            if (data.Reservations.length > 0 && data.Reservations[0].Instances.length > 0) {
                const instance = data.Reservations[0].Instances[0];

                const info = {
                    id: instance.InstanceId,
                    typ: instance.InstanceType,
                    stan: instance.State.Name,
                    publiczne_ip: instance.PublicIpAddress || "Brak",
                    data_uruchomienia: instance.LaunchTime,
                    strefa: instance.Placement.AvailabilityZone
                };

                callback(null, info);
            } else {
                callback(new Error("Nie znaleziono instancji o podanym ID"));
            }
        }
    });
};

exports.lab = task;