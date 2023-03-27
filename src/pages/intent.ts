
import Stripe from 'stripe'
import type { APIRoute } from 'astro';
import { loadCart } from '../lib/data'

const stripe = new Stripe(import.meta.env.PRIVATE_STRIPE_API,{
  apiVersion: '2022-11-15'
})

export const post: APIRoute = async function get ({params, request}) {

  const paymentIntent = await stripe.paymentIntents.create({
    amount: JSON.parse(params.body!).amount,
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
  })

  return new Response( JSON.stringify({clientSecret: paymentIntent.client_secret}),{
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  })
}