
import Stripe from 'stripe'
import type { APIRoute } from 'astro';

const stripe=() => new Stripe(import.meta.env.PRIVATE_STRIPE_API, {
  apiVersion: '2022-11-15'
})

export const post: APIRoute = async function get({ params, request }: any) {

  const body = await request.json()

  let url = "https://cancel"
  let error = ""
  try {

    const session = await stripe().checkout.sessions.create({
      customer_email: body.email,
      client_reference_id: body.order,
      line_items: [
        {
          price: 'price_1MoBVGBRZLMDvS4RGtPKuq2k',
          quantity: body.quantity,
        },
      ],
      mode: 'payment',
      success_url: `https://cloudflare.cat-test-codes.pages.dev/CAT/thankyou`,
      cancel_url: `https://cloudflare.cat-test-codes.pages.dev/CAT/cancel`,
      automatic_tax: { enabled: true },
    })
    url = session.url ?? "https://cloudflare.cat-test-codes.pages.dev/CAT/cancel"
  } catch (e: any) {
    // console.log(stripe)
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
