import { Component, Show, createSignal, onMount } from 'solid-js'
import { loadStripe } from '@stripe/stripe-js'
import { CardCvc, CardExpiry, CardNumber, Elements, useStripe, useStripeElements } from 'solid-stripe'
import { Order, loadCart } from './data'


// IMPORTANT!!! replace this key with your PUBLIC key. Do not allow your private key to put into git!!!!!!!
const api_key = import.meta.env.PUBLIC_STRIPE_API
export const PayForm: Component<{}> = (props) => {
  const [stripe, setStripe] = createSignal(null)
  const otxt = window.localStorage.order
  const order = loadCart()
  const n = order.student.length
  const price = 20 * 100

  onMount(async () => {
    const result = await loadStripe(api_key)
    setStripe(result as any)
  })

  return (
    <div>
    <div class="dark:text-white">Amount: {n} tests * 20 = ${n*20}</div>
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

  const [paying,setPaying] = createSignal(false)
  const [error, setError] = createSignal("")
  const submit = async (e: any)=>{
    e.preventDefault()
    setPaying(true)
    console.log("paying...")
    // we have to build the intent
    const order = loadCart()
    const n = order.student.length
    const price = 20 * 100
    const orderTotal = n * price

    const a = await fetch('/intent', {
      method: 'POST',
      cache: "no-cache", 
      body: JSON.stringify({"amount":Number(orderTotal)}),
    })
    const b = await a.json();
    const result = await stripe().confirmCardPayment(b.clientSecret, {
      payment_method: {
        card: elements().getElement(CardNumber)!,
        billing_details: {},
      },
    })

    if (!result.error) {
      location.href = '/thankyou'
    } else {
      setPaying(false)
      setError(result.error.message??"unknown error")
    }
  }
  return (
    <div class="dark:text-white">
      <div>You can use these values to test</div>
      <div>Your public stripe key is {api_key}</div>
      <div>4242 4242 4242 4242</div>
      <div>12/34</div>
      <div>999</div>
      <div>{error()}</div>
      
    <form onsubmit={submit} >
      <div class="bg-gray-200">
      <CardNumber />
      <CardExpiry />
      <CardCvc />
      </div>
      <button>Pay</button>
    </form>
    </div>
  )
}