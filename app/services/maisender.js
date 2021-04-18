const nodemailer = require('nodemailer');
const sendgrid = require('nodemailer-sendgrid-transport');


function sendMail()
{
    return nodemailer.createTransport(sendgrid({
        auth: {
            api_key: 'xxx'
        }
    }));
}

module.exports.send = sendMail;