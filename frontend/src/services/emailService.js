import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const OTP_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_OTP_TEMPLATE_ID;
const ORDER_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_ORDER_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const sendOTP = async (toEmail, toName, otpCode) => {
  try {
    const templateParams = {
      to_email: toEmail,
      to_name: toName || 'User',
      otp_code: otpCode,
    };
    const response = await emailjs.send(SERVICE_ID, OTP_TEMPLATE_ID, templateParams, PUBLIC_KEY);
    return { success: true, response };
  } catch (error) {
    console.error('Error sending OTP:', error);
    return { success: false, error };
  }
};

export const sendOrderConfirmation = async (toEmail, toName, orderId, total) => {
  try {
    const templateParams = {
      to_email: toEmail,
      to_name: toName || 'User',
      order_id: orderId,
      total: total,
    };
    const response = await emailjs.send(SERVICE_ID, ORDER_TEMPLATE_ID, templateParams, PUBLIC_KEY);
    return { success: true, response };
  } catch (error) {
    console.error('Error sending order confirmation:', error);
    return { success: false, error };
  }
};
