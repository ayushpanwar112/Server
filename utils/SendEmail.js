// SendEmail.js
import { Resend } from 'resend';

const SendEmail = async (options) => {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("Missing Resend API key in environment variables.");
    }

    const resend = new Resend(process.env.RESEND_API_KEY); // move this inside after the check

    const response = await resend.emails.send({
      from: 'StockBox <service@stockboxtech.com>', // Must match your verified domain sender
      to: options.to || 'sachingusain848@gmail.com',
      subject: options.subject,
      text: options.text || '',
      html: options.html || '',
    });

    console.log("Email sent with ID:", response.id);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Error sending email with Resend:", error);
    return { success: false, message: "Email sending failed", error };
  }
};

export default SendEmail;
