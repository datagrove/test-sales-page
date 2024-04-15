
import Stripe from 'stripe'
import type { APIRoute } from 'astro';

const stripe=() => new Stripe(import.meta.env.PRIVATE_STRIPE_API, {
  apiVersion: '2022-11-15'
})

export const POST: APIRoute = async function get({ params, request }: any) {

  const body = await request.json()

  console.log("Body: " + JSON.stringify(body))
  let url = "https://cat.datagrove.com/retry"
  let error = ""
  try {

    const session = await stripe().checkout.sessions.create({
      customer_email: body.email,
      client_reference_id: body.order,
      line_items: [
        {
          price: 'price_1MxyyGBRZLMDvS4R1o4lRcku',
          quantity: body.quantity,
        },
      ],
      mode: 'payment',
      allow_promotion_codes: true,
      success_url: `http://localhost:4321/thankyou`,
      cancel_url: `http://localhost:4321/cancel`,
      automatic_tax: { enabled: true },
    })
    url = session.url ?? "https://cat.datagrove.com/cancel"
  } catch (e: any) {
    // console.log(stripe)
    console.log("Error: " + JSON.stringify(e))
    error = JSON.stringify(e)
  }

  return new Response(JSON.stringify({
    url: url,
    error: error
  }),{
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  })

}
