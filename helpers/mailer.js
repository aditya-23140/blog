import { User } from "@/lib/model/user";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userID }) => {
  try {
    const hashedToken = await bcrypt.hash(userID.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userID, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType == "RESET")
      await User.findByIdAndUpdate(userID, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    {
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST || "smtp.mailtrap.io",
      port: process.env.MAILTRAP_PORT || 587, // Try 2525, 587, or 465
      secure: process.env.MAILTRAP_PORT === "465", // Use true for port 465
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const emailContent =
      emailType === "VERIFY"
        ? `<p>Click <a href="${process.env.Domain}/verifyemail?token=${hashedToken}">here</a> to verify your email.</p>`
        : `<p>Click <a href="${process.env.Domain}/resetpassword?token=${hashedToken}">here</a> to reset your password.</p>`;

    const mailOptions = {
      from: "23bcs013@iiitdmj.ac.in", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
      html: emailContent, // html body
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
