const stripe = require('../config/stripe');
const PaymentModel = require('../models/paymentModel');

const PaymentService = {
    processCardPayment: async (amount, currency, paymentMethodId) => {
        try {
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

            const paymentData = {
                amount,
                currency,
                payment_status: paymentIntent.status,
                stripe_payment_id: paymentIntent.id,
            };

            await new Promise((resolve, reject) => {
                PaymentModel.createPayment(paymentData, (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                });
            });

            return { success: true, paymentStatus: paymentIntent.status };
        } catch (error) {
            throw new Error(error.message);
        }
    },
    
};

module.exports = PaymentService;