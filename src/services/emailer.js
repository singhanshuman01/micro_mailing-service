const nodemailer = require('nodemailer');

const send = async (msg) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_FROM,
                pass: process.env.APP_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: 'Testing google smtp',
            html: `${msg.name} <br>
            ${msg.mob} <br>
            ${msg.loc} <br>
            ${msg.nature} <br>
            ${msg.budget} <br>
            ${msg.service} <br>
            `
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }

}

module.exports = {send};
