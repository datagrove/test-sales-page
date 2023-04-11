
import Stripe from 'stripe'
import type { APIRoute } from 'astro';

const stripe = new Stripe(import.meta.env.PRIVATE_STRIPE_API, {
  apiVersion: '2022-11-15'
})

const endpointSecret:string = import.meta.env.PRIVATE_STRIPE_ENDPOINT

export const post: APIRoute = async function get({ params, request }: any) {

  console.log("Request Header"+ (request.headers.get("stripe-signature")))
  // const body = await request.body.getReader().read();
  // console.log("Body: " + JSON.stringify(body))

  const buffers = [];
  for await (const chunk of request.body) {
    buffers.push(chunk);
  }

  const body = Buffer.concat(buffers);

  const sig = request.headers.get('stripe-signature');

  try {
    const event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    console.log(`Event Type: ${event.type}`)
  } catch (err: any) {
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
