
import Stripe from 'stripe'
import type { APIRoute } from 'astro';
import { loadCart } from '../lib/data'
import supabase from '../components/SupabaseClient'
// import  {DatabaseSubmit} from '../lib/OrderSubmit'

const stripe = () => new Stripe(import.meta.env.PRIVATE_STRIPE_API, {
  apiVersion: '2022-11-15'
})

const endpointSecret = () => import.meta.env.PRIVATE_STRIPE_ENDPOINT

// console.log(JSON.stringify(loadCart()))

// const database = async () => {await fetch('/supabaseSubmit', {
//   method: "POST",
//   body: JSON.stringify(loadCart()),
// })};

export const POST: APIRoute = async function get({ params, request }: any) {

  // console.log("Request Header" + (request.headers.get("stripe-signature")))
  // const body = await request.body.getReader().read();
  // console.log("Body: " + JSON.stringify(body))

  const buffers = [];
  for await (const chunk of request.body) {
    buffers.push(chunk);
  }

  let body: string = ''

  buffers.forEach((buffer) => {
    body += new TextDecoder().decode(buffer)
  })

  // const body = new TextDecoder().decode(buffers[0]);

  const sig = request.headers.get('stripe-signature');

  let event;

  try {
    event = await stripe().webhooks.constructEventAsync(body, sig, endpointSecret())
    console.log(`Event Type: ${event.type}`)

  } catch (err: any) {
    console.log("Error Type: "+ err.type);
  }

  if (event === undefined) {
    console.log("Event is undefined")
  } else {

    const data = event.data.object as Stripe.Checkout.Session;

    switch (event.type) {
      case 'checkout.session.completed': {
        console.log("Session Completed", event);
        const newSession = await stripe().checkout.sessions.retrieve(
          data.id)
        await supabase.from('profile').update({
          Payment_status: true,
        }).eq('order_number', newSession.client_reference_id)
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
