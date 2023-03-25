import { Show, createSignal, onMount } from 'solid-js'
import { loadStripe } from '@stripe/stripe-js'
import { CardCvc, CardExpiry, CardNumber, Elements, useStripe, useStripeElements } from 'solid-stripe'

const api_key = import.meta.env.PUBLIC_STRIPE_API
export function PayForm() {
  const [stripe, setStripe] = createSignal(null)

  onMount(async () => {
    const result = await loadStripe(import.meta.env.PUBLIC_STRIPE_API)
    setStripe(result as any)
  })

  return (
    <div><div>API key ={api_key}=</div>
    <Show when={stripe()} fallback={<div>Loading stripe</div>}>
      <Elements stripe={stripe() as any}>
       <CheckoutForm/>
      </Elements>
    </Show>
    </div>
  )
}


function CheckoutForm() {
  const stripe = useStripe()
  const elements = useStripeElements()

  // const [, { Form }] = createRouteAction(async () => {
  //   const clientSecret = "" // fetch from /api/create-payment-intent
  //   // When the form submits, pass the CardNumber component to stripe().confirmCardPayment()
  //   const result = await stripe().confirmCardPayment(clientSecret, {
  //     payment_method: {
  //       card: elements().getElement(CardNumber),
  //       billing_details: {},
  //     },
  //   })

  //   if (result.error) {
  //     // payment failed
  //   }
  //   else {
  //     // payment succeeded
  //   }
  // })

  return (
    <form>
      <CardNumber />
      <CardExpiry />
      <CardCvc />
      <button>Pay</button>
    </form>
  )
}