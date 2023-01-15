const nodemailer = require("nodemailer");

const nodmail = async (email, otp) => {
  return new Promise((resolve, reject) => {
    console.log("im in nodemailer");
    try {
      let transporter = nodemailer.createTransport({
        service: "mail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: process.env.MAIL,
          pass: process.env.PASSWORD,
        },

        logger: true,
        debug: true,
      });

      transporter.sendMail(
        {
          from: '"Fred Foo 👻" justinkj765@gmail.com',
          to: email,
          subject: "Hello ✔",
          text: otp,
          html: `<b>Your OTP for login is ${otp}</b>`,
        },
        (error) => {
          if (error) {
            reject(error)
          } else {
            console.log("messages sent successfully");
            resolve("message sent successfully")
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = {
  nodmail,
};
