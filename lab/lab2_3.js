const { EC2Client, RunInstancesCommand, DescribeInstancesCommand, waitUntilInstanceRunning } = require("@aws-sdk/client-ec2");

const ec2Client = new EC2Client({ region: "eu-central-1" });

const lab = async function(req, callback) {
    try {
        const runParams = {
            ImageId: "ami-05852c5f195d545ea",
            InstanceType: "t3.micro",
            MinCount: 1,
            MaxCount: 1,
        };

        const runData = await ec2Client.send(new RunInstancesCommand(runParams));
        const instanceId = runData.Instances[0].InstanceId;

        await waitUntilInstanceRunning(
            { client: ec2Client, maxWaitTime: 300 },
            { InstanceIds: [instanceId] }
        );

        const descData = await ec2Client.send(new DescribeInstancesCommand({ InstanceIds: [instanceId] }));
        const instance = descData.Reservations[0].Instances[0];

        const result = {
            success: true,
            instanceId: instance.InstanceId,
            publicIp: instance.PublicIpAddress,
            publicDns: instance.PublicDnsName
        };

        callback(null, JSON.stringify(result));

    } catch (err) {
        console.error("Błąd AWS:", err);
        callback(err.message);
    }
};

exports.lab = lab;