const nodemailer = require('nodemailer');

const createTransporter = () => {
    // We use Gmail SMTP for real emails
    // You MUST set EMAIL_USER and EMAIL_PASS in your .env / Render environment
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

const sendOrderConfirmationEmail = async (userEmail, orderId, total) => {
    try {
        // If credentials are not set, skip email sending to avoid crashing/hanging
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.warn("EMAIL_USER or EMAIL_PASS not set. Skipping email notification.");
            return null;
        }

        const transporter = createTransporter();

        const mailOptions = {
            from: `"Flipkart Clone" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: `Order Confirmation - #${orderId}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto;">
                    <h1 style="color: #2874f0;">Thank you for your order!</h1>
                    <p>Your order <strong>#${orderId}</strong> has been successfully placed.</p>
                    <div style="background: #f1f3f6; padding: 15px; border-radius: 4px; margin: 20px 0;">
                        <h2 style="margin: 0 0 10px 0; color: #212121;">Order Summary</h2>
                        <p style="margin: 0; font-size: 18px; font-weight: bold; color: #212121;">
                            Total Amount: ₹${total.toLocaleString('en-IN')}
                        </p>
                    </div>
                    <p>We will notify you once it ships.</p>
                    <hr style="border: 1px solid #eee; margin: 20px 0;" />
                    <p style="font-size: 12px; color: #878787;">This is an automated email from your Flipkart Clone assignment.</p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Real Email sent successfully to ${userEmail}: ${info.messageId}`);
        return true;
    } catch (err) {
        console.error("Error sending real email:", err);
        return null;
    }
};

module.exports = {
    sendOrderConfirmationEmail
};
