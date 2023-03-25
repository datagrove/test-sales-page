import { Show, createSignal, onMount } from 'solid-js'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from 'solid-stripe'

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
        {/* this is where your Stripe components go */}
      </Elements>
    </Show>
    </div>
  )
}