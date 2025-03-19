const PaymentService = require('../services/paymentService');
const CreateCustomerService = require('../services/CreateStripeCustomer.js')
const PaymentController = {
    handleCardPayment: async (req, res) => {
        try {
            const { amount, currency, paymentMethodId } = req.body;
            if (!amount || !currency || !paymentMethodId) {
                return res.status(400).json({ error: 'Amount, currency, and paymentMethodId are required' });
            }

            const response = await PaymentService.processCardPayment(amount, currency, paymentMethodId);
            res.json(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createUserAccount : async (req, res) => {
        const { email, userID, name } = req.body;
      
        try {
          
      
          const newCustomer = await CreateCustomerService.processCustomerCreation(email, userID, name);
          res.status(201).json({ message: "User account created successfully", data: newCustomer });
        } catch (error) {
          res.status(500).json({ message: "Error creating user account", error: error.message });
        }
      
},
};

 
module.exports = PaymentController;