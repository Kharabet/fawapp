var express = require('express');
var router = express.Router();
var nodeMailer = require('nodemailer');
var ejs = require("ejs");
var path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Fucking Awesome Website app!' });
});

router.post('/send-email', function (req, res) {
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'pensioneer4ik@gmail.com',
      pass: process.env.GMAIL_PASS
    }
  });
  var customer = {
    customerName: req.body.customerName,
    customerEmail: req.body.customerEmail,
    customerPhone: req.body.customerPhone,
    customerComment: req.body.customerComment
  }
  ejs.renderFile("views/emails/emailFromClient.ejs", customer, function (err, html) {
    if (err) {
      console.log(err);
    } else {
      let mailOptions = {
        from: '"fawapp" <pensioneer4ik@gmail.com>', // sender address
        to: "naukov@mail.ru", // list of receivers
        subject: 'test order', // Subject line
        html: html, // html body,
        // attachments: [
        //   {
        //     fileName: 'testFile',
        //     streamSource: req.files.customerFile
        //   }
        // ]
      };
      console.log("html data ======================>", mailOptions.html);

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.render('index');
      });
    }
  });



});

module.exports = router;
