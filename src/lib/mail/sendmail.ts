import nodemailer from 'nodemailer';

export const sendMail = async (recipient: string, subject: string, resetLink: string) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'mailgun',
            auth: {
                user: import.meta.env.VITE_MAILUSERNAME,
                pass: import.meta.env.VITE_MAILPASSWORD,
            },
        });

        await transporter.sendMail({
            from: import.meta.env.VITE_MAILUSERNAME,
            to: recipient,
            subject: subject,
            html: `
              <h1>Password Reset</h1>
              <p>We have received a request to reset your password. If you did not request this change, please ignore this email.</p>
              <p>To reset your password, please click on the following link:</p>
              <p><a href="${resetLink}" target="_blank">${resetLink}</a></p>
              <p>If you need assistance, please contact our support team at support@mail.staff-navigator.com</p>
              <p>Thank you,</p>
              <p>The Staff Navigator Team</p>
            `
        });

        console.log("Password Reset Email Sent");
    } catch (error) {
        console.log(error, "ERROR : Password Reset Email Not Sent");
    }
}