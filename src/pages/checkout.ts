
import Stripe from 'stripe'
import type { APIRoute } from 'astro';

const stripe = new Stripe(import.meta.env.PRIVATE_STRIPE_API, {
  apiVersion: '2022-11-15'
})

export const post: APIRoute = async function get({ params, request }: any) {

  const body = await request.json()
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: 'price_1MoBVGBRZLMDvS4RGtPKuq2k',
        quantity: body.quantity,
      },
    ],
    mode: 'payment',
    success_url: `/thankyou`,
    cancel_url: `/pay`,
    automatic_tax: { enabled: true },
  })

  return new Response(JSON.stringify({
    url: session.url
  }))

}
