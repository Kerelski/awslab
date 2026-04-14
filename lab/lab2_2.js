const AWS = require("aws-sdk");
AWS.config.loadFromPath("./config.json");

const ec2 = new AWS.EC2();

const task = function (request, callback) {

    const params = {
        InstanceIds: [ request.query.instanceId ]
    };

    ec2.describeInstances(params, function(err, data) {
        if (err) {
            console.log("Błąd pobierania danych:", err);
            callback(err);
        } else {

            const instance = data.Reservations[0].Instances[0];

            const info = {
                id: instance.InstanceId,
                typ: instance.InstanceType,
                stan: instance.State.Name,
                publiczne_ip: instance.PublicIpAddress,
                data_uruchomienia: instance.LaunchTime,
                strefa: instance.Placement.AvailabilityZone
            };

            callback(null, info);
        }
    });
};

exports.lab = task