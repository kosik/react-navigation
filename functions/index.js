require('dotenv').config();
const functions = require('firebase-functions');
const stripe = require('stripe')(process.env.SECERT_KEY);

exports.createPaymentIntent = functions.https.onRequest(
  async (request, response) => {
    try {
      // Create the PaymentIntent
      const paymentIntent = await stripe.paymentIntents.create({
        payment_method: request.body.payment_method_id,
        amount: 1900,
        currency: 'sek',
        confirmation_method: 'manual',
        confirm: true,
        setup_future_usage: 'off_session',
      });

      return response.send(paymentIntent);
    } catch (e) {
      // Display error on client
      return response.send({error: e.message});
    }
  },
);

exports.confirmPaymentIntent = functions.https.onRequest(
  async (request, response) => {
    try {
      // Confrim the PaymentIntent
      const confirmedIntent = await stripe.paymentIntents.confirm(
        request.body.paymentIntentId,
      );

      return response.send(confirmedIntent);
    } catch (e) {
      // Display error on client
      return response.send({error: e.message});
    }
  },
);
exports.updateCustomer = functions.https.onRequest(
  async (request, response) => {
    try {
      // Update customer
      const customerID = request.body.customerID;
      const customer = await stripe.customers.update(customerID, {
        source: request.body.source,
      });

      return response.send(customer);
    } catch (e) {
      // Display error on client
      return response.send({error: e.message});
    }
  },
);

exports.createSubscription = functions.https.onRequest(
  async (request, response) => {
    try {
      // create the customer
      const customer = await stripe.customers.create({
        email: request.body.email,
        name: request.body.name,
        payment_method: request.body.payment_method_id,
        invoice_settings: {
          default_payment_method: request.body.payment_method_id,
        },
      });
      // create the subscription
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{plan: ''}],
        expand: ['latest_invoice.payment_intent'],
      });

      return response.send(subscription);
    } catch (e) {
      // Display error on client
      return response.send({error: e.message});
    }
  },
);
