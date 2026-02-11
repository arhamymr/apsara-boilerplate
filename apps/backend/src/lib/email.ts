import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text }: { to: string; subject: string; text: string }) => {
    // Implement your email sending logic here using your preferred email service
    console.log(`Sending email to ${to} with subject "${subject}"`);
    // For example, using nodemailer or any third-party email service API

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
  });

    await transporter.sendMail({
        from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_USERNAME}>`,
        to,
        subject,
        text,
    });
}