const nodemailer = require('nodemailer');

/**
 * Send email using configured SMTP credentials
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise<object>}
 */
const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            family: 4,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: `"Coursify" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text,
        });

        console.log(`Email dispatched to ${to} (MessageId: ${info.messageId})`);
        return info;
    } catch (error) {
        console.error('Mail Dispatch Error:', error.message);
        throw error;
    }
};

module.exports = { sendEmail };
