const nodemailer = require('nodemailer');

const sendEmail = async (otp, userEmail) => {
  // Create a secure transporter using TLS
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'iftekharulhaque2000@gmail.com',
      pass: 'guih nhsd sacu fdxt'
    }
  });


  const mailOptions = {
    from: 'Inventory-app <iftekharulhaque2000@gmail.com>',
    to: userEmail,
    subject: 'Your Verification OTP',
    html: `Your one-time password (OTP) is: <b>${otp}</b>`
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendEmail;
