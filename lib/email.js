import nodemailer from 'nodemailer';

// Create a transporter
const createTransporter = () => {
  // For production, use your actual SMTP settings
  if (process.env.NODE_ENV === 'production') {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  
  // For development/testing, use a test account from Ethereal
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: process.env.TEST_EMAIL_USER || 'your-test-email@ethereal.email',
      pass: process.env.TEST_EMAIL_PASSWORD || 'your-test-password',
    },
  });
};

// Generate a random OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email
export const sendOTPEmail = async (email, otp, name) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Vellex Store <noreply@vellexstore.com>',
      to: email,
      subject: 'Verify Your Email - Vellex Store',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 5px;">
          <h2 style="color: #333; text-align: center;">Vellex Store Email Verification</h2>
          <p>Hello ${name},</p>
          <p>Thank you for registering with Vellex Store. To complete your registration, please use the following verification code:</p>
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; margin: 20px 0; border-radius: 4px;">
            <h1 style="font-size: 30px; margin: 0; color: #4a5568;">${otp}</h1>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you did not request this code, please ignore this email.</p>
          <p>Best regards,<br>The Vellex Store Team</p>
        </div>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    
    if (process.env.NODE_ENV !== 'production') {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export default { sendOTPEmail, generateOTP }; 