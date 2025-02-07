Please mention API endpoint , secure or not , request and response format here.

Payment Microservice:
POST: http://localhost:5001/api/payments/card-pay
JSON: 
{
  "amount": 51,
  "currency": "usd",
  "paymentMethodId": "pm_card_visa"
}