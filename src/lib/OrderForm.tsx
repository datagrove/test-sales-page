
import { Component, For, createSignal, onMount, createResource } from 'solid-js'
import StudentForm from './StudentForm'
import { Order, Student, loadCart } from './data';

// async function postFormData(formData: Order) {
//   const response = await fetch("/supabaseSubmit", {
//     method: "POST",
//     body: JSON.stringify(formData),
//   });
//   const data = await response.json();
//   return data;
// }

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

  // const addStudentEnabaled = () => {
  //   if()
  // }
  

  return (
    <div aria-live="polite" class="dark:text-gray-400 align-center flex justify-center">
      <form 
        id="order-form"
        class="w-full md:w-2/3 md:max-w-1/2"
      >
        <div class="mb-6">
          <h3 class="text-xl">Your Information</h3>
          <div class="p-3">
            {/* <label for="firstName" class="pr-8">First Name</label> */}
            <input
              id="firstName"
              class="pl-1 border-b-2 border-gray-500 bg-transparent placeholder-gray-400 dark:placeholder-gray-500 w-full"
              type="text"
              placeholder='First Name'
              required
              value={order().first}
              onChange={(e) => update({first: e.currentTarget.value})}
            />
          </div>
          <div class="p-3">
            {/* <label for="lastName" class="pr-8">Last Name</label> */}
            <input
              id="lastName"
              class="pl-1 border-b-2 border-gray-500 bg-transparent placeholder-gray-400 dark:placeholder-gray-500 w-full"
              type="text"
              required
              placeholder='Last Name'
              value={order().last}
              onChange={(e) => update({last: e.currentTarget.value})}
            />
          </div>
          <div class="p-3">
            {/* <label for="email" class="pr-4">Email</label> */}
            <input
              id="email"
              class="pl-1 border-b-2 border-gray-500 bg-transparent placeholder-gray-400 dark:placeholder-gray-500 last:w-full"
              type="text"
              required
              placeholder='Email'
              value={order().email}
              onChange={(e) => update({email: e.currentTarget.value})}
            />
          </div>
        </div>
        {/* <hr /> */}
        <div class="mb-6">
          <h3 class="text-xl">Your Student(s)</h3>
          <div class="m-2">

            <For each={order().student} >{ (e,i)=> {
              <div></div>
              return <StudentForm student={()=>order().student[i()]} setStudent={(s: Student)=>{
                const o = order().student;
                o[i()] = s
                update({student: o})
              }} onRemove={()=>{remove(i())}}/>
            }}
            </For>
          </div>
          <button disabled={ false } onClick={addStudent}>Add Another Student</button>
          <br />
        </div>
        <div class="flex justify-center mt-4">
          <button 
            id="checkout"
            class="bg-green-700 rounded px-4 py-2 w-full text-white justify-center border-2 border-green-900 dark:border-slate-400"
          >
            <a href='/pay'> 
              Checkout
            </a>
          </button>
        </div>
    </form>

    </div>
  )
}
