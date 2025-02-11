Please mention API endpoint , secure or not , request and response format here.

Payment Microservice:
POST: http://localhost:5001/api/payments/card-pay
JSON: 
{
  "amount": 51,
  "currency": "usd",
  "paymentMethodId": "pm_card_visa"
}


user-auth:

1. /auth/register -- not secure

request body : 

{
  "email":"your email",
  "password":"your password",
  "firstName":"fname",
  "lastName":"lname"
}


