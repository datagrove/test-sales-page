
import { Component, For, createSignal, onMount } from 'solid-js'
import StudentForm from './StudentForm'
import { Order, Student, loadCart } from './data';


export const OrderForm: Component = () => {

  const [order, setOrder] = createSignal<Order>(loadCart())
  onMount(()=>{
    if (window.localStorage.order) {
      const a = JSON.parse(window.localStorage.order)
      console.log("loaded ", a)
      setOrder(a)
    }
  })
  const update = (p: Partial<Order>) => {
    setOrder({ ...order(), ...p })
    window.localStorage.order = JSON.stringify(order());
    console.log(window.localStorage.order)
  }
  const addStudent = ()=>{
    update( {student: [...order().student, {first: '', last: '', grade: ''} ]})
  }
  const remove = (i: number) => {
    const o = [ ...order().student]
    o.splice(i,1)
    update({student: o})
  }
  const checkout = () =>{

  }
  return (
    <div aria-live="polite" class="dark:text-gray-400 align-center">
        <div class="p-3">
          <label for="firstName" class="pr-8">First Name</label>
          <input
            id="firstName"
            type="text"
            value={order().first}
            onChange={(e) => update({first: e.currentTarget.value})}
          />
        </div>
        <div class="p-3">
          <label for="lastName" class="pr-8">Last Name</label>
          <input
            id="lastName"
            type="text"
            value={order().last}
            onChange={(e) => update({last: e.currentTarget.value})}
          />
        </div>
        <div class="p-3">
          <label for="email" class="pr-4">Email</label>
          <input
            id="email"
            type="text"
            value={order().email}
            onChange={(e) => update({email: e.currentTarget.value})}
          />
        </div>
        <hr />
        <h3>Your Students</h3>
        <div>
          <For each={order().student} >{ (e,i)=> {
            return <StudentForm student={()=>order().student[i()]} setStudent={(s: Student)=>{
              const o = order().student;
              o[i()] = s
              update({student: o})
            }} onRemove={()=>{remove(i())}}/>
          }}</For>
        </div>
        <button onClick={addStudent}>Add Student</button>
        <div><a href='/pay'> 
            Checkout
            </a></div>
    </div>
  )
}