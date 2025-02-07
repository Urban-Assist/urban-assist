const db = require('../config/db');

const PaymentModel = {
    createPayment: (paymentData, callback) => {
        const sql = `INSERT INTO payments (amount, currency, payment_status, stripe_payment_id) VALUES (?, ?, ?, ?)`;
        const values = [paymentData.amount, paymentData.currency, paymentData.payment_status, paymentData.stripe_payment_id];
        db.query(sql, values, callback);
    },
};

module.exports = PaymentModel;