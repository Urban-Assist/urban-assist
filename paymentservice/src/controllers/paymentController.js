const PaymentService = require('../services/paymentService');

const PaymentController = {
    handleCardPayment: async (req, res) => {
        try {
            const { amount, currency, paymentMethodId, bookingId } = req.body;

            // Validate required fields
            if (!amount || !currency || !paymentMethodId) {
                return res.status(400).json({ error: 'Amount, currency, and paymentMethodId are required' });
            }

            if (!bookingId) {
                return res.status(400).json({ error: 'Booking ID is required' });
            }

            const paymentData = {
                amount,
                currency,
                paymentMethodId,
                bookingId
            };

            const response = await PaymentService.processCardPayment(paymentData);
            res.json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = PaymentController;