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
router.post('/send-email', upload.any(), function (req, res) {
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'pensioneer4ik@gmail.com',
      serviceClient: '102774118056088218753',
      privateKey: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCt8CCm+KHOlIuc\niRh3N/0TWysPBu840AcQ8/egFPs9Hef+lMSFlUtmdab1HDctMnkYr9N4FyT0YWtw\n94nn0J0UYJ1YX68HTjzQ32agfo+IXgVx2Y3Va9AVjnWQtHYasH6chfMdcdSdgD6w\ntRvhQf8D7oC8J/CwbrgCh739zU+VNam9DLhhYKDAsJo6bfTMGkveRk/MkRae5wE8\nWkMXyldZwJRdg6WPhpYezEBeuNKzdaU9mEyZxRn4xrgAd9dvcDf/38Fvm1zpsWZC\ny+n/328JkFvSoxivDLrywkRhwwMQ8cjLttd2fagRFjTb3emtM3qGfT2U95Ap0H7D\no7Q52RqdAgMBAAECggEARuICNHlDW2/eu0KFZWQ8LqyrDfsp9vGTx51cjvCt+Bid\nZ/qRYczXBuCwUtgWRkV44w4YNCreZPbkdYtzODSkJt8+j/qiVexUzVwVMxeQf6at\nOlnJuq0uhfJhx8A7FyJQ3pGZ4yh12F+gbJvJylD+T0hdTxBJvmTIeUN/MhR+t5OS\nbnkb5hb+2OnGs087KI1ZWXT9r1Yvo9a9aH+pFS0/z52Jvrls1BTWojEVm01Y5jCk\npkP9DTRxyG+3vy2kJnsNxL9NuvRlkvsTytCXhbFOSKqyfI1qLYSDH4ZALarZqx7U\nkxAYZr3zg+xolyfgxBdu4OZK9DGHMOnr0Hd5tOOEEwKBgQD1ZSaFkINrIb8Ko3mx\n715zbgOPhGcGwHv749Wx+cea3Ya3x4rZ+P66WFS+A5prsI5dzDpitJINvbL281ZU\n9gKTjc2hquusd7POb4o/1fl6QvEV2GyAcR6IU9vfFaBFMuzcvBJrSQMX9at4nz4Y\n7FbcdQIiN5U8Aq/a46j3ss9rfwKBgQC1dG8wOJyiPOJy0/1FjZGKpVm/7cuNCdwh\nTwSj702S5BvALpevlGMD52easu4qyBefyqhYbm/yv9Q+qv4eFM8oAFIyiK0YnDK3\nk9/qRvP5lBCG+lWCi9LiDQlbMMJ/PK8S+A0Zc/1j+QGgl5WhvNa977DkPCRybbte\nd/sPiGu34wKBgQC9jS+PVkydMUj/b70t+8dKhH1Nm6l1ZrOeo6PKwTU0488PIJyZ\nuKMSz+5NhD0A2DVwMLQc0HxNDu4xoU9be1gMICnpqjw3UZNbb38rxh3aGeFdzXoq\nULaT+arKDEtriGW8L65Onuw70rFsEB2IZO7Hhb5rLeIho7Ww78/x3XYpAwKBgQCS\nsXyqKTpH1pzjZAofTqHYynBSP3YNoWj67Jy9w1qdZBgjOAedBIM/xrX1VK5Cm9yt\na/LI+w852mdF+orR2tTWa9wHyoLVoIFH9B5TkeTvYgoydPLoRQ3JfeyQckzq/C41\nUZ+VcjXpuobcQ2/Of5HDn6EMAqscbyXI64pmNk2PLQKBgDkRLkJz97WgRJfpAkcj\nwd0/CaiaWYwwDGhsJ3qvd5S4USOIl5kl51ssTtkThLeryaiBwp/c/K7MZNmnftBv\nZnKPZd7ZESwVw8bJ596MWhRfhBuReq+lqDDUI7FhQu7MwHrqbnPRaGgeLA7zDsBw\nLsykPVwWxxTUtFdBARfbX8t0\n-----END PRIVATE KEY-----\n',
      accessToken: 'ya29.GltYBf6dRy7Jb-pPo49PoDthxMyrqLkrjdVnOnSKcLT1zgnBwQ7FX2JkNxV8f6Zqc598f3FUUsiZ-VkdCVuRNeGXSTxX5hdJBWSTFEmW31SVahko61_fEXlCWZ_j',
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
      from: '"fawapp" <pensioneer4ik@gmail.com>', // sender address
      to: "pensioneer4ik@gmail.com", // list of receivers
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
      res.render('index');
    });
  });
});

module.exports = router;
