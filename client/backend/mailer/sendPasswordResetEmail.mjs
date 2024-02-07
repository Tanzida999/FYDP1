import sendEmail from './sendEmail.mjs';

const sendPasswordResetEmail = (to, resetLink) => {
    const subject = 'Password Reset Request';
    const html = `<p>Click this link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`;
    sendEmail(to, subject, html);
};

export default sendPasswordResetEmail;
