import { Order, loadCart } from './data';
import { Component, Show, createSignal, onMount, For } from 'solid-js'

export const DatabaseSubmit : Component = () => {

  const [order, setOrder] = createSignal<Order>(loadCart())

  onMount(()=>{
      if (window.localStorage.order) {
      const a = JSON.parse(window.localStorage.order)
      // console.log("loaded ", a)
      setOrder(a)
    }
  })
  return (
    <div>
      <Submit/>
    </div>
  )

function Submit() {
  console.log(JSON.stringify(loadCart()))
  const a = async (e: any) => {
    const database = await fetch('/supabaseSubmit', {
      method: "POST",
      body: JSON.stringify(loadCart()),
    });
  }
  return (
    <div>
    </div>
  )
}
}
