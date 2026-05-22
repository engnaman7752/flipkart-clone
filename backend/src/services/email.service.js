const nodemailer = require('nodemailer');

let cachedTransporter = null;

const createTransporter = async () => {
    if (cachedTransporter) return cachedTransporter;
    try {
        let testAccount = await nodemailer.createTestAccount();
        cachedTransporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });
        return cachedTransporter;
    } catch (err) {
        console.error("Failed to create Ethereal account:", err);
        throw err;
    }
};

const sendOrderConfirmationEmail = async (userEmail, orderId, total) => {
    try {
        const transporter = await createTransporter();

        const mailOptions = {
            from: '"Flipkart Clone" <noreply@flipkartclone.com>',
            to: userEmail,
            subject: `Order Confirmation - #${orderId}`,
            html: `
                <h1>Thank you for your order!</h1>
                <p>Your order <strong>#${orderId}</strong> has been successfully placed.</p>
                <p>Total Amount: ₹${total.toLocaleString('en-IN')}</p>
                <br/>
                <p>We will notify you once it ships.</p>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        const previewUrl = nodemailer.getTestMessageUrl(info);
        console.log(`Email sent: ${info.messageId}`);
        console.log(`Preview URL: ${previewUrl}`);
        return previewUrl;
    } catch (err) {
        console.error("Error sending email:", err);
        return null;
    }
};

module.exports = {
    sendOrderConfirmationEmail
};
