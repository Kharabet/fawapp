var express = require('express');
var router = express.Router();
var nodeMailer = require('nodemailer');
var ejs = require("ejs");
var multer = require('multer');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Fucking Awesome Website app!' });
});

/* POST order form. */
var upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 1,
    fileSize: 20 * 1000 * 1000
  },
})
router.post('/api/send-email', upload.any(), function (req, res) {
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: '24star.kiev@gmail.com',
      clientId: '701931091901-c4vmj1gf6dsqh99g1vtb84h72lvluovf.apps.googleusercontent.com',
      clientSecret: '13OtOg9g1VVfCYM92GehclU8',
      accessToken: 'ya29.GltZBYQCp23Pk4wdz5GyYBqaDyuve1dN3nRK7Q4bllWgeUel72FqFIlrfzY7dOcHLN4y5k0TmNNOAo9VJETxfpILItYmi4tamauD7ajC-B4J141TU9mtCGhKHSSO',
      refreshToken: "1/6HmfbI3ajMppEOqqiE85jaxCjA1aTVSq2VEK8QQB-T8"
    }
  });
  var customer = {
    customerName: req.body.customerName,
    customerEmail: req.body.customerEmail,
    customerPhone: req.body.customerPhone || "не указан",
    customerComment: req.body.customerComment || "не указан"
  }
  ejs.renderFile("./views/emails/emailFromClient.ejs", customer, function (err, html) {
    if (err) {
      return console.log(err);
    }
    var mailOptions = {
      from: '"fawapp" <24star.kiev@gmail.com>', // sender address
      to: "24star.kiev@gmail.com", // list of receivers
      subject: 'Feedback from customer', // Subject line
      html: html // html body,
    };
    if (req.files.length == 1) {
      var uploadedFile = req.files[0];
      mailOptions.attachments = [
        {
          filename: uploadedFile.originalname,
          content: uploadedFile.buffer
        }
      ]
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
      res.redirect('/');
    });
  });
});

module.exports = router;
