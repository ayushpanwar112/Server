import nodemailer from "nodemailer";

const UserEmail = async (options) => {
  try {
    if (!process.env.EMAIL_USERNAME || !process.env.EMAIL_PASSWORD) {
      throw new Error("Missing email credentials in environment variables.");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"StockBox Customer Service" <${process.env.EMAIL_USERNAME}>`,
      to: options.to, // ✅ fixed
      subject: options.subject || "Stockbox Notification", // ✅ use dynamic subject
      text: options.text || "", // ✅ use dynamic text
      html: options.html || "", // ✅ use dynamic html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`User email sent: ${info.messageId}`);

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending user email:", error);
    return { success: false, message: "Email sending failed", error };
  }
};

export default UserEmail;
