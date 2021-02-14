const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const RECIPIENTS = process.env.SMS_RECIPIENTS.split(',');

const sendText = async (body) => {
  await Promise.all(
    RECIPIENTS.map((recipient) =>
      client.messages.create({
        body,
        to: recipient,
        from: process.env.TWILIO_NUMBER,
      })
    )
  );
};

module.exports = sendText;
