import hbs from "hbs";
import SendEmail from "../utils/SendEmail.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import UserEmail from "../utils/UserEmail.js";

// Setup __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to load and compile HBS template
const loadTemplate = (templateName, replacements) => {
  const templatePath = path.join(__dirname, "emailTemplate", templateName);
  const source = fs.readFileSync(templatePath, "utf-8");
  const template = hbs.compile(source);
  return template(replacements);
};

export const email = async (req, res) => {
  const { email, name, subject, message, phone, title } = req.body;

  if (!email || !name || !subject || !message || !title) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  // Admin notification template
  const AdminHtmlTemplate = loadTemplate("emailTemplate.hbs", {
    title: title.title || "New Contact Form Submission",
    name: `From: ${name}`,
    subject,
    email,
    message,
    phone: phone || "N/A",
  });

  // User confirmation template
  const UserHtmlTemplate = loadTemplate("emailTemplate.hbs", {
    title: "Thank you for contacting Stockbox",
    name: `Hi ${name}`,
    subject: "We’ve received your message",
    email: "service@stockboxtech.com",
    message: `Hello ${name},We’ve received your message and will get back to you as soon as possible.<br><br>Thank you!  Stockbox Team`,
    phone: "7217019005, 7217019001",
  });

  try {
    // Send to admin
    await SendEmail({
      to: "service@stockboxtech.com",
      subject: `Contact Form: ${subject}`,
      text: `Message from ${email}: ${message} (Phone: ${phone || "N/A"})`,
      html: AdminHtmlTemplate,
    });

    // Send to user
    await UserEmail({
      to: email,
      subject: "Thanks for reaching out to Stockbox",
      text: "We’ve received your message and will respond shortly.",
      html: UserHtmlTemplate,
    });

    console.log("Emails sent successfully");
    return res
      .status(200)
      .json({ success: true, message: "Emails sent successfully" });
  } catch (error) {
    console.error("Email sending failed:", error);
    return res
      .status(500)
      .json({ success: false, message: "Email sending failed" });
  }
};
