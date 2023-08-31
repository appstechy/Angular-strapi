
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Use the 'helmet' package to enhance security by setting HTTP headers.
const helmet = require('helmet');
app.use(helmet());

app.use(bodyParser.json());

app.use(cors());

// Instead of printing sensitive info to the console, log it securely.
console.log('Email username and password are configured.');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER_NAME,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

app.post('/send-email', (req, res) => {
    const to = req.body.to;

    const mailOptions = {
        from: process.env.EMAIL_USER_NAME,
        to: to,
        subject: 'Thanks for subscribing to our newsletter',
        text: 'Hey there, Thanks for subscribing to our newsletter. Regards'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully!!');
        }
    });
});

app.get('', (req, res) =>{
    res.send("Running Successfully!!!");
})

// Use environment variable for the production port.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
