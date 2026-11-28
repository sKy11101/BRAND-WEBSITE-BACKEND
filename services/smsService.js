import "dotenv/config";

import {
    SNSClient,
    PublishCommand
} from "@aws-sdk/client-sns";

const sns = new SNSClient({
    region: process.env.AWS_REGION || "ap-south-1"
});

export const sendSMS = async (phone, otp) => {

    const command = new PublishCommand({

        PhoneNumber: `+91${phone}`,

        Message: `Your Groxifi verification code is ${otp}. It is valid for 5 minutes.`,

        MessageAttributes: {
            "AWS.SNS.SMS.SMSType": {
                DataType: "String",
                StringValue: "Transactional"
            }
        }
    });

    const response = await sns.send(command);

    return response;
};
