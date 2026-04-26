const { AutoScalingClient, SetDesiredCapacityCommand } = require("@aws-sdk/client-auto-scaling");


const asgClient = new AutoScalingClient({ region: "eu-central-1" });

const lab = async function(req, callback) {
    try {
        const asgName = req.query.asgName;
        const newDesiredCapacity = parseInt(req.query.desired);

        if (!asgName || isNaN(newDesiredCapacity)) {
            throw new Error("Brakujące parametry: asgName lub desired");
        }

        const params = {
            AutoScalingGroupName: asgName,
            DesiredCapacity: newDesiredCapacity,
            HonorCooldown: true
        };

        await asgClient.send(new SetDesiredCapacityCommand(params));

        const result = {
            success: true,
            message: `Zmieniono wymaganą liczbę instancji w grupie ${asgName} na ${newDesiredCapacity}.`,
            timestamp: new Date().toISOString()
        };

        callback(null, JSON.stringify(result));

    } catch (err) {
        console.error("Błąd Auto Scaling API:", err);
        callback(err.message);
    }
};

exports.lab = lab;