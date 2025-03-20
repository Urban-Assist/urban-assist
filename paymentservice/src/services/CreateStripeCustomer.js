const stripe = require('../config/stripe');
const customerMapping = require('../models/CustomerMapping.js');
const providerMapping = require('../models/ProviderMapping.js'); // Add this import

const CreateStripeCustomer = {
    processProviderCreation: async (email, userID, name, role) => {
        try {
            // First, check if provider already exists in our database
            const existingProviderRecords = await providerMapping.ProviderMapping.findAll({
                where: { providerID: userID }
            });
            
            if (existingProviderRecords.length > 0) {
                console.log("Provider already exists in database:", email);
                return {
                    success: true,
                    connectedAccountId: existingProviderRecords[0].providerStripeAccountID,
                    isNewProvider: false
                };
            }
            
            // Find if a connected account exists for this email
            const accounts = await stripe.accounts.list({ limit: 100 });
             const existingAccount = accounts.data.find(
                account => account.individual && account.individual.email === email
            );
           // console.log("Existing Account:--------", existingAccount);
            
            let connectedAccount;
            
            if (existingAccount) {
                // Use existing connected account
                connectedAccount = existingAccount;
                console.log("Using existing connected account for provider:----" + email);
            } else {
                // Create new connected account if none exists
                try {
                    connectedAccount = await stripe.accounts.create({
                        type: "custom",
                        country: "US",
                        capabilities: {
                            card_payments: { requested: true },
                            transfers: { requested: true },
                        },
                        business_type: "individual",
                        individual: {
                            email: email,
                            first_name: name ? name.split(' ')[0] : '',
                            last_name: name ? name.split(' ').slice(1).join(' ') : ''
                        },
                        tos_acceptance: {
                            date: Math.floor(Date.now() / 1000),
                            ip: "192.168.1.1", // Replace with the user's actual IP
                        },
                        // Ensure transfers capability is explicitly enabled
                        settings: {
                            payouts: {
                                schedule: {
                                    interval: 'manual'
                                }
                            }
                        }
                    });
                    console.log("New connected account created for provider:" + email);
                } catch (stripeError) {
                    console.error("Stripe account creation error:", stripeError.message);
                    if (stripeError.type === 'StripeInvalidRequestError') {
                        console.error("Invalid parameters:", stripeError.param);
                    }
                    throw new Error(`Failed to create Stripe account: ${stripeError.message}`);
                }
            }

            const providerData = {
                providerEmail: email,
                providerID: userID,
                providerStripeID: connectedAccount.id,
            };
            console.log("Provider Data: ", providerData);
            
            // Save provider data in the database
            // No need to check again since we already did above
            const databaseInstance = await providerMapping.ProviderMapping.findAll({where: {providerID: userID}});
          if(databaseInstance.length > 0){
            console.log("Provider already exists in the database");
        
            return { success: true, connectedAccountId: providerData.providerStripeID, isNewProvider: !existingAccount };
          }
            await providerMapping.ProviderMapping.create({...providerData});

            console.log("Provider mapping saved in the database");

            return { 
                success: true, 
                connectedAccountId: connectedAccount.id, 
                isNewProvider: !existingAccount 
            };
        } catch (error) {
            console.error("Error in processProviderCreation: ", error);
            throw new Error(error.message);
        }
    },
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