const stripe = require('../config/stripe');
const customerMapping = require('../models/CustomerMapping.js');

const CreateStripeCustomer = {
    processCustomerCreation: async (email, userID, name) => {
        try {
 
            // First, check if customer already exists with this email
            const existingCustomers = await stripe.customers.list({
                email: email,
                limit: 1
            });
            

            let customer;
            
            if (existingCustomers.data.length > 0) {
                // Customer already exists, use the existing customer
                customer = existingCustomers.data[0];
                console.log("Using existing customer account for email: " + email);
            } else {
                // Create new customer if none exists
                customer = await stripe.customers.create({
                    email,
                    name,
                });
                console.log("New account created for customer: " + email);
            }

            const customerData = {
                customerEmail: email,
                customerID: userID, // Ensure userID is an integer
                customerStripeID: customer.id,
            };
            // Save customer data in the database
            
            //check if it is there in the local 
            const existingCustomerRecords = await customerMapping.CustomerMapping.findAll({where: {customerID: userID}});
            if(existingCustomerRecords.length > 0){
                console.log("Customer already exists in the database");
                return { success: true, customerId: customer.id, isNewCustomer: existingCustomers.data.length === 0 };
            }
            else{
                const databaseInstance = await customerMapping.CustomerMapping.create({...customerData})
                console.log("Customer data saved in the database");
            }

            return { success: true, customerId: customer.id, isNewCustomer: existingCustomers.data.length === 0 };
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
 
module.exports = CreateStripeCustomer;