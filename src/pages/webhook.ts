
import Stripe from 'stripe'
import type { APIRoute } from 'astro';

const stripe = new Stripe(import.meta.env.PRIVATE_STRIPE_API, {
  apiVersion: '2022-11-15'
})

const endpointSecret = import.meta.env.PRIVATE_STRIPE_ENDPOINT

export const post: APIRoute = async function get({ params, request }: any) {

  const buffers = [];

  for await (const data of request.body){
    buffers.push(data);
    console.log(buffers)
  }
  
  const body = Buffer.concat(buffers);

  const sig = request.headers.get['stripe-signature'] as string;


  try {
    const event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    console.log(`Event Type: ${event.type}`)
  } catch (err:any) {
    console.log(err);
  }

//   console.log(`Event Type: ${event.type}`)

//   switch (event.type){
//     case 'checkout.session.completed':
//       const session:any = event.data.object;
//       if (session.payment_status === 'paid'){
//         console.log(session)
//       }
//       break;

//     default:
//       console.log(`Unhandled event type ${event.type}`)
//   }

  return new Response(
    JSON.stringify({
      message: `Success`,
    }),
    { status: 200 }
  );
}
