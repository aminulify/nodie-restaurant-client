/***
 * 
 * 1. install stripe and react stripe js
 * 2. create "checkoutForm" with card element (card elements contains): card number, expiration date, cvs, zip code
 * 3. create a payment method
 * 4. use test card to test payment (search and go explore "stripe test cards")
 * 5. create a payment method
 * 6. used test card to test payment
 * 7. Go to stripe docs > payments > under overview click "Accept a payment" > QuickStart => on the server side install stripe
 * 8. create a payment intent and take secret api from stripe dashboard and make payment method typesL ['card']
 * 9. make sure you provide amount in cents (multiply price with * 100)
 * 10. call payment intent api to get client secret and store it in a state
 * 11. use confirmCardPayment api with client secret card info
 * 12. display confirm card error
 * 13. display confirm card success
 * 14. do things after payment ----> 
 * 
 */