const nodemailer = require("nodemailer");

// Create a transporter using SMTP
const sendEmail = async ( email, Subject, message) => {
const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

await transporter.sendMail({
  from:process.env.SMTP_USER,
  to:email,
  subject:Subject,
  text:message
})
}

module.exports = sendEmail ;