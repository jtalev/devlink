import { loadStripe } from '@stripe/stripe-js'

export const redirectToCheckout = async (formData) => {
    // console.log('redirectToCheckout')

    // const stripe = await getStripe()
    // const { error } = await stripe.redirectToCheckout(checkoutOptions)
    // console.log('stripe checkout error', error)

    const sessionResponse = await fetch('http://localhost:4000/api/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })

    const session = await sessionResponse.json()
    console.log(session)

    const stripe = await loadStripe('pk_test_51NvpqjDcRCR7ntouxg5T5qj6ACgL9dL1AwBMRMHUyO1uqCTAtSsLXmBbpOoSYh5KSUMhpj02Dq6W5ukUKxPzNDOj00UvuNzbED');
    const { error } = await stripe.redirectToCheckout({
        sessionId: session.id
    });

    if (error) {
        console.log("Error redirecting to Stripe Checkout:", error.message);
    }
}