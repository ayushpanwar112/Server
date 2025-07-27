/* import nodemailer from "nodemailer";

const SendEmail = async (options) => {
  try {
    if (!process.env.EMAIL_USERNAME || !process.env.EMAIL_PASSWORD) {
      throw new Error("Missing email credentials in environment variables.");
    }

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Define the email options
    const mailOptions = {
      from: `"StockBox Customer Service" <${process.env.EMAIL_USERNAME}>`, // Properly formatted sender
      to: "inwebcontact.stockboxtech@gmail.com", // Use dynamic recipient from options
      subject: options.subject,
      text: options.text || "", // Ensure text is optional
      html: options.html || "", // Ensure HTML is optional
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Email sending failed", error };
  }
};

export default SendEmail;
 */

// utils/SendEmail.js

import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const SendEmail = async (options) => {
  try {
    if (!process.env.EMAIL_USERNAME || !process.env.EMAIL_PASSWORD) {
      throw new Error("Missing email credentials in environment variables.");
    }

    // MXroute SMTP configuration
    const transporter = nodemailer.createTransport({
      host: "heracles.mxrouting.net",
      port: 465, // SSL
      secure: true, // Use SSL
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // Allow self-signed certs (safe for VPS)
      },
      connectionTimeout: 10000,
    });

    // Define mail content
    const mailOptions = {
      from: `"StockBox Support" <${process.env.EMAIL_USERNAME}>`,
      to: options.to || "inwebcontact.stockboxtech@gmail.com",
      subject: options.subject || "No Subject",
      text: options.text || "",
      html: options.html || "",
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent: ${info.messageId}, Response: ${info.response}`);

    return {
      success: true,
      message: "Email sent successfully",
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return {
      success: false,
      message: "Email sending failed",
      error: error.message || error,
    };
  }
};

export default SendEmail;
