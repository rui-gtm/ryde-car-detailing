import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false
    }
  });
};

// Format email HTML content
const formatEmailContent = (data) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
        }
        .header {
          background-color: #007bff;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
        .content {
          background-color: white;
          padding: 30px;
          border-radius: 0 0 5px 5px;
        }
        .field {
          margin-bottom: 15px;
          padding: 10px;
          background-color: #f5f5f5;
          border-left: 3px solid #007bff;
        }
        .field-label {
          font-weight: bold;
          color: #007bff;
          margin-bottom: 5px;
        }
        .field-value {
          color: #333;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Quote Request - Ryde Car Detailing</h2>
        </div>
        <div class="content">
          <p>You have received a new quote request with the following details:</p>

          <div class="field">
            <div class="field-label">Name:</div>
            <div class="field-value">${data.name}</div>
          </div>

          <div class="field">
            <div class="field-label">Email:</div>
            <div class="field-value">${data.email}</div>
          </div>

          <div class="field">
            <div class="field-label">Phone:</div>
            <div class="field-value">${data.phone}</div>
          </div>

          <div class="field">
            <div class="field-label">Preferred Date:</div>
            <div class="field-value">${data.date}</div>
          </div>

          <div class="field">
            <div class="field-label">Preferred Time:</div>
            <div class="field-value">${data.time}</div>
          </div>

          <div class="field">
            <div class="field-label">Address:</div>
            <div class="field-value">${data.address}</div>
          </div>

          <div class="field">
            <div class="field-label">Vehicle Type:</div>
            <div class="field-value">${data.vehicleType}</div>
          </div>

          <div class="field">
            <div class="field-label">Package:</div>
            <div class="field-value">${data.package}</div>
          </div>

          <div class="field">
            <div class="field-label">Message:</div>
            <div class="field-value">${data.message}</div>
          </div>

          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">

          <p style="color: #666; font-size: 12px;">
            This email was sent automatically from Ryde Car Detailing quote request form.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Send quote email
export const sendQuoteEmail = async (data) => {
  try {
    const transporter = createTransporter();

    // Verify transporter configuration
    await transporter.verify();
    console.log('SMTP connection verified successfully');

    const mailOptions = {
      from: `"Ryde Car Detailing" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: 'Quote from Ryde Car Detailing',
      html: formatEmailContent(data),
      text: `
New Quote Request

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Preferred Date: ${data.date}
Preferred Time: ${data.time}
Address: ${data.address}
Vehicle Type: ${data.vehicleType}
Package: ${data.package}
Message: ${data.message}
      `.trim()
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    return {
      success: true,
      messageId: info.messageId
    };

  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};
