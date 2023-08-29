const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(cors());

console.log(process.env.EMAIL_USER_NAME);
console.log(process.env.EMAIL_APP_PASSWORD);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL_USER_NAME,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});


app.post('/send-email', (req,res) =>{
    const to = req.body.to;

    const mailOptions = {
        from: process.env.EMAIL_USER_NAME,
        to: to,
        subject: 'Thanks for subscribing to our newsletter',
        text: 'Hey there, Thanks for subscribing to our newsletter. Regards'
    };


    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.log(error);
            res.status(500).send('Error sending email');
        } else{
            console.log('Email sent', info.response);
            res.status(200).send('Email sent successfully!!');
        }
    });
});


const PORT = 3000;
app.listen(PORT, () =>{
    console.log(`Server is runnig on port ${PORT}`);
});