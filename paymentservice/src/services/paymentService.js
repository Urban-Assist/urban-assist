const stripe = require('../config/stripe');
const PaymentModel = require('../models/paymentModel');
const axios = require('axios');

const PaymentService = {
    // Fetch booking details from database
    getBookingDetails: async (bookingId) => {
        return new Promise((resolve, reject) => {
            PaymentModel.getBookingById(bookingId, (err, results) => {
                if (err) {
                    reject(new Error('Failed to fetch booking details: ' + err.message));
                }
                if (!results || results.length === 0) {
                    reject(new Error('Booking not found'));
                }
                resolve(results[0]);
            });
        });
    },

    processCardPayment: async (paymentData) => {
        const { amount, currency, paymentMethodId, bookingId } = paymentData;

        try {
            // Fetch booking details to get user and provider emails
            const booking = await PaymentService.getBookingDetails(bookingId);

            // Create Stripe Payment Intent
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount * 100,
                currency,
                payment_method: paymentMethodId,
                confirm: true,
                automatic_payment_methods: {
                    enabled: true,
                    allow_redirects: "never"
                }
            });

            // Save payment to database
            const dbPaymentData = {
                amount,
                currency,
                payment_status: paymentIntent.status,
                stripe_payment_id: paymentIntent.id,
                user_email: booking.user_email,
                booking_id: bookingId
            };

            await new Promise((resolve, reject) => {
                PaymentModel.createPayment(dbPaymentData, (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                });
            });

            // Send email notifications if payment succeeded
            if (paymentIntent.status === 'succeeded') {
                await PaymentService.sendPaymentNotifications({
                    amount,
                    currency,
                    userEmail: booking.user_email,
                    providerEmail: booking.provider_email,
                    serviceName: booking.service_type || 'Service',
                    userName: booking.user_name || 'Customer',
                    providerName: booking.provider_name || 'Provider',
                    paymentId: paymentIntent.id
                });
            }

            return { success: true, paymentStatus: paymentIntent.status };
        } catch (error) {
            throw new Error(error.message);
        }
    },

    sendPaymentNotifications: async (details) => {
        const { amount, currency, userEmail, providerEmail, serviceName, userName, providerName, paymentId } = details;
        const emailServiceUrl = process.env.EMAIL_SERVICE_URL || 'http://email:8001/mail/send';

        try {
            // Send receipt to user
            const userEmailContent = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #4CAF50;">Payment Receipt - Urban Assist</h2>
                    <p>Dear ${userName},</p>
                    <p>Thank you for your payment! Your transaction has been processed successfully.</p>
                    
                    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">Payment Details</h3>
                        <p><strong>Service:</strong> ${serviceName}</p>
                        <p><strong>Provider:</strong> ${providerName}</p>
                        <p><strong>Amount:</strong> ${currency.toUpperCase()} ${amount.toFixed(2)}</p>
                        <p><strong>Transaction ID:</strong> ${paymentId}</p>
                        <p><strong>Status:</strong> <span style="color: #4CAF50;">Succeeded</span></p>
                    </div>
                    
                    <p>You will receive further updates about your service booking shortly.</p>
                    <p>If you have any questions, please don't hesitate to contact us.</p>
                    
                    <p>Best regards,<br>Urban Assist Team</p>
                </div>
            `;

            await axios.post(emailServiceUrl, {
                to: userEmail,
                subject: '✅ Payment Confirmation - Urban Assist',
                html: userEmailContent
            });

            console.log('✅ Receipt email sent to user');

            // Send booking notification to service provider
            const providerEmailContent = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2196F3;">New Booking Notification - Urban Assist</h2>
                    <p>Dear ${providerName},</p>
                    <p>Great news! You have received a new booking.</p>
                    
                    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">Booking Details</h3>
                        <p><strong>Customer:</strong> ${userName}</p>
                        <p><strong>Customer Email:</strong> ${userEmail}</p>
                        <p><strong>Service:</strong> ${serviceName}</p>
                        <p><strong>Payment Amount:</strong> ${currency.toUpperCase()} ${amount.toFixed(2)}</p>
                        <p><strong>Payment Status:</strong> <span style="color: #4CAF50;">Paid</span></p>
                    </div>
                    
                    <p>Please log in to your dashboard to view complete booking details and manage your schedule.</p>
                    <p>Make sure to prepare for providing excellent service to your customer!</p>
                    
                    <p>Best regards,<br>Urban Assist Team</p>
                </div>
            `;

            await axios.post(emailServiceUrl, {
                to: providerEmail,
                subject: '🔔 New Service Booking - Urban Assist',
                html: providerEmailContent
            });

            console.log('✅ Booking notification sent to provider');

        } catch (emailError) {
            console.error('⚠️ Email notification failed:', emailError.message);
            // Don't throw error - payment already succeeded
        }
    }
};

module.exports = PaymentService;