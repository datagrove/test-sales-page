import { Component, Show, createSignal, onMount, For } from 'solid-js'
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
  const orderArray = order.student
  const price = 20 * 100

  onMount(async () => {
    const result = await loadStripe(api_key)
    setStripe(result as any)
  })

  return (
    <div>
      <div class="my-4 flex flex-col justify-center items-center mb-10">
        <h2 class="text-2xl font-bold">Order Summary</h2>
        <div class="flex flex-col w-80 mt-4 dark:text-slate-400">
          {/* Amount: {n} tests * 20 = ${n*20} */}

          { 
            orderArray.map((student) => (
              <div class="flex justify-between px-4 py-1 border-2 border-slate-400 rounded mb-4">
            
                <div>
                  <p class="font-bold text-lg">{ student.first } { student.last }</p>
                  <p>Grade { student.grade } Test</p>
                  <p>$20.00</p>
                </div>

                <div class="flex items-center">
                  <svg
                    class="w-12 h-12 dark:fill-gray-400 fill-black"
                    version="1.1"
                    viewBox="0 0 350 350"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m59.045 246.25v-155.32h23.849v156.24l27.806 3.6726v-137.11h24.259v4.7495c0 44.134 0.0412 88.269-0.0758 132.4-0.01 3.5936 0.75294 5.197 4.6358 5.769 7.5945 1.118 15.087 2.9294 23.18 4.5686v-190.35h24.19v193.59c9.2813 0.60019 18.24 1.1765 27.64 1.7832v-165.49h24.16v165.28c9.4568-0.48102 18.422-0.93929 27.871-1.4225v-126.54c7.757 0 15.025-0.052 22.29 0.0899 0.64678 0.013 1.559 1.2004 1.8277 2.014 0.32284 0.97938 0.091 2.1418 0.0921 3.2241v119.07c13.609-2.7626 26.56-5.2804 39.456-8.0603 5.1384-1.1083 10.118-2.9479 15.245-4.1147 1.3629-0.31093 3.0107 0.63161 4.5285 0.99888-1.0227 1.1386-1.8602 2.9825-3.0952 3.3086-24.16 6.3464-48.243 13.062-72.6 18.563-22.092 4.99-44.651 6.9087-67.336 5.5263-25.599-1.5601-50.525-7.1091-75.386-13.1a1813.1 1813.1 0 0 0-56.91-12.733c-24.273-5.028-45.669 2.1949-65.23 16.349-1.754 1.2686-3.3303 2.872-5.2414 3.8005-1.1473 0.55793-2.7843 0.10725-4.2013 0.10833 0.47127-1.2188 0.59044-2.859 1.4669-3.5914 11.789-9.862 25.014-17.021 40.108-20.339 5.5252-1.2166 11.172-1.8927 17.471-2.9316z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                      stroke-width="1.0834"
                    >
                    </path>
                  </svg>
                </div>
              
              </div>
            ))
          }
        </div>

        <div class="w-80 mt-2 mb-8">
          <a href="/order" class="flex justify-end">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              class="dark:fill-slate-400 mx-2"
              viewBox="0 0 24 24" 
              width="24px" 
              height="24px">
              <path d="M18.4,4.4l1.2,1.2L6.2,19H5v-1.2L18.4,4.4 M18.4,2c-0.3,0-0.5,0.1-0.7,0.3L3,17v4h4L21.7,6.3c0.4-0.4,0.4-1,0-1.4l-2.6-2.6 C18.9,2.1,18.7,2,18.4,2L18.4,2z"/>
              <path d="M15.8 4.3H17.8V9.2H15.8z" transform="rotate(-45.001 16.75 6.75)"/>
            </svg>

            <p class="text-end">Edit Order</p>
          </a>
        </div>

        <div class="flex">
          <p class="font-bold text-xl">Total: ${ n*20 }.00</p>
        </div>
      </div>
      
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
    const email = order.email

    const a = await fetch('/intent', {
      method: 'POST',
      cache: "no-cache", 
      body: JSON.stringify({"amount":Number(orderTotal), receipt_email:String(email), "quantity":String(n.toString())}),
    })
    const b = await a.json();
    const result = await stripe().confirmCardPayment(b.clientSecret, {
      payment_method: {
        card: elements().getElement(CardNumber)!,
        billing_details: {},
      },
    })

    if (!result.error) {
      const response = await fetch("/supabaseSubmit", {
        method: "POST",
        body: JSON.stringify(loadCart()),
      });
      location.href = '/thankyou'
    } else {
      setPaying(false)
      setError(result.error.message??"unknown error")
    }
  }
  return (
    <div class="dark:text-white">
      
      {/* <div>You can use these values to test</div>
      <div>Your public stripe key is {api_key}</div>
      <div>4242 4242 4242 4242</div>
      <div>12/34</div>
      <div>999</div>
      <div>{error()}</div> */}
      
    <form onsubmit={submit} >
      <div class="flex flex-col items-center justify-center mb-24">
        <div class="bg-gray-200 w-80 mb-4 p-4 rounded-md">
          <div class="p-2 my-4 rounded border-2 border-slate-400">
            <CardNumber />
          </div>
          
          <div class="flex">
            <div class="p-2 my-4 w-1/2 mr-2 rounded border-2 border-slate-400">
              <CardExpiry />
            </div>

            <div class="p-2 my-4 w-1/2 ml-2 rounded border-2 border-slate-400">
              <CardCvc />
            </div>
          </div>
        </div>
        <button class="bg-green-700 rounded-full shadow px-4 py-2 w-80 text-white text-2xl justify-center border border-green-900 dark:border-slate-400">
          Pay
        </button>
      </div>
    </form>
    </div>
  )
}