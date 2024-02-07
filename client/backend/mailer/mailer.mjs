import nodemailer from 'nodemailer';

// const transport = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   service: "Gmail",
//   port: 587, // 587 is the default TLS port
//   secure: false,
//   auth: {
//     user: "pizzaapp62@gmail.com",
//     pass: "uimk qosg xtea ghuj"
//   }
// });

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4a21a5e28ee93f",
    pass: "8b47e99810963c"
  }
});

export default transport;
