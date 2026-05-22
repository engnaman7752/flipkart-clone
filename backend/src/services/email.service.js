const nodemailer = require('nodemailer');

// Set up Ethereal Email (a free fake SMTP service for testing)
const createTransporter = async () => {
    // Generate test SMTP service account from ethereal.email
    let testAccount = await nodemailer.createTestAccount();

    return nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });
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
