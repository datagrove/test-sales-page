import { Component, Show, createSignal, onMount } from 'solid-js'
import { loadStripe } from '@stripe/stripe-js'
import { CardCvc, CardExpiry, CardNumber, Elements, useStripe, useStripeElements } from 'solid-stripe'
import { Order, loadCart } from './data'

const api_key = import.meta.env.PUBLIC_STRIPE_API
export const PayForm: Component<{}> = (props) => {
  const [stripe, setStripe] = createSignal(null)
  const otxt = window.localStorage.order
  const order = loadCart()
  const n = order.student.length

  onMount(async () => {
    const result = await loadStripe(import.meta.env.PUBLIC_STRIPE_API)
    setStripe(result as any)
    
  })

  return (
    <div>
    <div>Amount: {n} tests * 15 = ${n*15}</div>
    <Show when={stripe()} fallback={<div>Loading stripe</div>}>
      <Elements stripe={stripe() as any}>
       <CheckoutForm/>
      </Elements>
    </Show>
    </div>
  )
}

async function pay() {
  return ""
}

function CheckoutForm() {
  const stripe = useStripe()
  const elements = useStripeElements()
  const clientSecret = ""

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
  const [paying,setPaying] = createSignal(false)
  const [error, setError] = createSignal("")
  const submit = async (e: any)=>{
    e.preventDefault()
    setPaying(true)
    console.log("paying...")
    const payerror = ''
    if (!payerror) {
      location.href = '/thankyou'
    } else {
      setPaying(false)
      setError(payerror)
    }
  }
  return (
    <div>
      <div>error()</div>
    <form onsubmit={submit}>
      <CardNumber />
      <CardExpiry />
      <CardCvc />
      <button>Pay</button>
    </form>
    </div>
  )
}