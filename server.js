const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const twilio = require('twilio');
const dotenv = require('dotenv');
const app = express();

// Load environment variables from .env file
dotenv.config();

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/send-sms', (req, res) => {
    const { to, message } = req.body;
    console.log(`Received request to send SMS to ${to} with message: ${message}`);
    client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: to
    })
    .then(message => {
        console.log('SMS sent successfully:', message.sid);
        res.send(message.sid);
    })
    .catch(error => {
        console.error('Error sending SMS:', error);
        res.status(500).send(error);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
