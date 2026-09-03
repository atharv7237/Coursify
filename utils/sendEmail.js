const nodemailer = require("nodemailer");
console.log(process.env.SMTP_USER)
// Create a transporter using SMTP
const sendEmail = async ( email, Subject, message) => {
try {
  const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  family: 4, // use IPv4
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
catch (error) {
  console.log(error.message)
}
}

module.exports = sendEmail ;