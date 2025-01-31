import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your-publishable-key-here');

export const handlePayment = async (amount) => {
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: 'price_id', quantity: 1 }],
        mode: 'payment',
        successUrl: 'https://yourdomain.com/success',
        cancelUrl: 'https://yourdomain.com/cancel',
    });
    if (error) {
        console.error('Payment error:', error);
    }
};