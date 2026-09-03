const nodemailer = require("nodemailer");

const sendEmail = async (email, Subject, message) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            family: 4,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.verify();
        console.log("SMTP connection verified");

        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: Subject,
            text: message,
        });

        console.log("EMAIL SENT:", info.messageId);
        console.log("ACCEPTED:", info.accepted);
        console.log("REJECTED:", info.rejected);

        return info;
    } catch (error) {
        console.log("EMAIL ERROR:", error);
        throw error;
    }
};

module.exports = sendEmail;