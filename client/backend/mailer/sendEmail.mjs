import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, html) => {

    // const transport = nodemailer.createTransport({
    //     host: "smtp.gmail.com",
    //     service: "Gmail",
    //     port: 587, // 587 is the default TLS port
    //     secure: false,
    //     auth: {
    //         user: "pizzaapp62@gmail.com",
    //         pass: "uimk qosg xtea ghuj"
    //     }
    // });

    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "4a21a5e28ee93f",
          pass: "8b47e99810963c"
        }
      });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to,
        subject,
        html,
    };

    try {
        await transport.sendMail(mailOptions);
        console.log('Email sent successfully.');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

export default sendEmail;