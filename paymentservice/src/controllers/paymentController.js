const PaymentService = require('../services/paymentService');
const CreateCustomerService = require('../services/CreateStripeCustomer.js');
const { CustomerMapping } = require('../models/CustomerMapping.js');
const { Transactions } = require('../models/paymentModel.js');
const PaymentController = {
    processCardPayment: async (req, res) => {
        //to information
        console.log(req.body.user?.provider?.id);
        console.log(req.body.user.provider?.firstName+" "+req.body.provider?.lastName);
        console.log(req.body.user.provider?.email);

        //from deatails
        console.log("---"+req.consumer.id)

        console.log(req.body.user?.provider?.price)

        // Create instance object with the logged values
        const instance = {
                to: req.body.user.provider?.email || null,
                name: req.body.user.provider?.firstName + " " + req.body.user.provider?.lastName || "Unknown User",
                providerName: req.body.user.provider?.firstName + " " + req.body.provider?.lastName || "Unknown Provider",
                from: req.consumer?.sub || null,          
                price: req.body.user?.provider?.price || "0"          
        };
        
        console.log(req.body.user)
      const savedTransaction = await Transactions.create(instance);
         return res.status(200).json({message:"Payment successful", savedTransaction});
    },
        
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