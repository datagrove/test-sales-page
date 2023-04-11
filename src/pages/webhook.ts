
import Stripe from 'stripe'
import type { APIRoute } from 'astro';
import { loadCart } from '../lib/data'
// import  {DatabaseSubmit} from '../lib/OrderSubmit'

const stripe = new Stripe(import.meta.env.PRIVATE_STRIPE_API, {
  apiVersion: '2022-11-15'
})

const endpointSecret: string = import.meta.env.PRIVATE_STRIPE_ENDPOINT

// console.log(JSON.stringify(loadCart()))

// const database = async () => {await fetch('/supabaseSubmit', {
//   method: "POST",
//   body: JSON.stringify(loadCart()),
// })};

export const post: APIRoute = async function get({ params, request }: any) {

  // console.log("Request Header" + (request.headers.get("stripe-signature")))
  // const body = await request.body.getReader().read();
  // console.log("Body: " + JSON.stringify(body))

  const buffers = [];
  for await (const chunk of request.body) {
    buffers.push(chunk);
  }

  const body = Buffer.concat(buffers);

  const sig = request.headers.get('stripe-signature');

  let event: any;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    console.log(`Event Type: ${event.type}`)
  } catch (err: any) {
    console.log(err.type);
  }

  //   console.log(`Event Type: ${event.type}`)

  if (event === undefined) {
    console.log("Event is undefined")
  } else {

  switch (event.type) {
    case 'charge.succeeded': {
      console.log("Charge Succeeded");
      break;
    }
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
return new Response(
  JSON.stringify({
    message: `Failure`,
  }),
  { status: 400 }
);
}
