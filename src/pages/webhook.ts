
import Stripe from 'stripe'
import type { APIRoute } from 'astro';

const stripe = new Stripe(import.meta.env.PRIVATE_STRIPE_API, {
  apiVersion: '2022-11-15'
})

const endpointSecret = import.meta.env.PRIVATE_STRIPE_ENDPOINT

export const post: APIRoute = async function get({ params, request }: any) {

  const body = await request.body;

  const sig = request.headers['stripe-signature']

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret)
  } catch (err:any) {
    return new Response(
      JSON.stringify({
        message: `Webhook Error: ${err.message}`,
      }),
      { status: 400 }
    );
  }

  console.log(`Event Type: ${event.type}`)

  switch (event.type){
    case 'checkout.session.completed':
      const session:any = event.data.object;
      if (session.payment_status === 'paid'){
        console.log(session)
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return new Response(
    JSON.stringify({
      message: `Success`,
    }),
    { status: 200 }
  );
}
