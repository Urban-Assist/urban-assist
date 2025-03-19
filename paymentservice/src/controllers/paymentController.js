const PaymentService = require('../services/paymentService');
const CreateCustomerService = require('../services/CreateStripeCustomer.js');
const stripe = require('../config/stripe');
const customerMapping = require('../models/CustomerMapping.js');

const { ApiResponse } = require('../utils/ApiResponse.js');
const { application } = require('express');
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
        const { email, userID, name, role } = req.body;
      if (role =="user"){
        try {

            const newCustomer = await CreateCustomerService.processCustomerCreation(email, userID, name,role);
            res.status(201).json({ message: "User account created successfully", data: newCustomer });
          } catch (error) {
            res.status(500).json({ message: "Error creating user account", error: error.message });
          }
      }
      else{
        try {
            const newProvider = await CreateCustomerService.processProviderCreation(email, userID, name,role);
            res.status(201).json({ message: "Provider account created successfully", data: newProvider });
          } catch (error) {
            res.status(500).json({ message: "Error creating provider account", error: error.message });
          }
      }
       
    },

    transactionFromConsumer: async (req, res) => {
        // The person who will receive the payment
        const providerID = req.body.providerDetails?.provider?.id;
    
        // The person who will pay
        const consumerID = req.consumer.id;
    
        // Check the amount to be transferred
        const amount = req.body.card?.amount;
        console.log("Provider ID:", providerID);
        console.log("Consumer ID:", consumerID);
        console.log("Amount:", amount);
    
        // Validation of required fields
        if (!providerID || !consumerID || !amount) {
            return res.status(400).json(new ApiResponse(400, null, "Provider ID, Consumer ID and Amount are required"));
        }
    
        // Fetch corresponding stripe account details of the provider and consumer
        const provider = await customerMapping.CustomerMapping.findOne({ where: { customerID: providerID } });
        const consumer = await customerMapping.CustomerMapping.findOne({ where: { customerID: consumerID } });
    
        if (!provider || !consumer) {
            return res.status(404).json(new ApiResponse(404, null, "Provider or Consumer not found"));
        }
    console.log("Provider:", provider.dataValues.customerStripeID);
    console.log("Provider:", consumer.dataValues.customerStripeID);
    const customer = await stripe.customers.retrieve('cus_RyNNYWAMYf9mwi');
    console.log(customer);
    
        console.log(customer);
        try {
            const commissionPercentage = 15;
            const commission = Math.round((amount * commissionPercentage) / 100);
    
            // Create a payment intent with the provider's connected account
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount * 100,
                currency: 'usd',
                payment_method: 'pm_card_visa', // Ensure this payment method is valid
                confirm: true,
                application_fee_amount: commission * 100,
                transfer_data: {
                    destination: "acct_1R4VYBP056JYKk2V" ,
                },
                customer: consumer.dataValues.customerStripeID,
                return_url: 'http://localhost:5173/dashboard',
            });
    
            return res.status(200).json(new ApiResponse(200, paymentIntent, "Transfer successful"));
        } catch (error) {
            return res.status(500).json(new ApiResponse(500, null, error.message));
        }
    },
};

module.exports = PaymentController;