const db = require('../config/db');

const PaymentModel = {
    createPayment: (paymentData, callback) => {
        const sql = `INSERT INTO payments (amount, currency, payment_status, stripe_payment_id, user_email, booking_id) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [
            paymentData.amount,
            paymentData.currency,
            paymentData.payment_status,
            paymentData.stripe_payment_id,
            paymentData.user_email,
            paymentData.booking_id
        ];
        db.query(sql, values, callback);
    },

    getBookingById: (bookingId, callback) => {
        const sql = 'SELECT user_email, provider_email, service_type, user_name, provider_name FROM bookings WHERE id = ?';
        db.query(sql, [bookingId], callback);
    },
};

module.exports = PaymentModel;