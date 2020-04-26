'use strict'
const config = require('./config');
const sendgrid = require('sendgrid')(config.sendgridKey);


exports.send = async(to, subject, body) => {
    sendgrid.send({
        to: to,
        from: 'kelly.fernanda.reis94@gmail.com',
        subject: subject,
        html: body
    })
}