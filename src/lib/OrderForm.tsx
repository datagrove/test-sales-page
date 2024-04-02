import type { Component } from 'solid-js'
import { For, createSignal, onMount, createResource } from 'solid-js'
import StudentForm from './StudentForm'
import type { Order, Student } from './data'
import { loadCart } from './data';

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
    console.log("mounted")
    console.log(window.localStorage.order)
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
    update( {students: [...order().students, {grade: ''} ]})
  }
  const remove = (i: number) => {
    const o = [ ...order().students]
    o.splice(i,1)
    update({students: o})
  }

  const addStudentEnabled = () => {
    let result = false

    order().students.map((student)=>{
      if(student.grade === ''){
        result = true
      }
    })
    return result
}

const checkout = (e: any) => {
  e.preventDefault()
  location.href="/pay"

}
  

  return (
    <div aria-live="polite" class="dark:text-gray-400 align-center flex justify-center mb-24">
      <form 
        id="order-form"
        class="w-full md:w-1/2"
      >
        <div class="mb-6">
          <h3 class="text-xl">Your Information</h3>
          <div class="p-3">
            <label for="firstName" class=" sr-only">First Name</label>
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
            <label for="lastName" class="sr-only">Last Name</label>
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
            <label for="email" class="sr-only">Email</label>
            <input
              id="email"
              class="pl-1 border-b-2 border-gray-500 bg-transparent placeholder-gray-400 dark:placeholder-gray-500 last:w-full"
              type="email"
              required
              placeholder='Email'
              value={order().email}
              onChange={(e) => update({email: e.currentTarget.value})}
            />
          </div>

          <p class="mt-6"><i>If you are testing at the end of the year we recommend selecting the <b><u>next</u></b> grade level for your student. <a href="#AENoticeAnchor" class="underline">See below for more information.</a></i></p>
        </div>

        <div class="mb-6">
          <h3 class="text-xl">Purchase CAT Codes by Grade Level</h3>
          <div class="m-2">
            <For each={order().students} >{ (e,i)=> {
              console.log("student ", order().students[i()])
              return <StudentForm student={()=>order().students[i()]} setStudent={(s: Student)=>{
                const o = order().students;
                o[i()] = s
                update({students: o})
              }} onRemove={()=>{remove(i())}}/>
            }}
            </For>
          </div>
          <div class={`flex justify-center text-xl font-bold ${addStudentEnabled()=== true ? "": "hidden"}`}>
            <p>All fields are required.</p>
          </div>
          <div class=" flex justify-start mx-6">
          <button 
            class="flex justify-center items-center bg-blue-900 rounded shadow ml-1 px-2 py-1 w-fit text-white border border-green-900 dark:border-slate-400 disabled:bg-slate-400 dark:disabled:bg-slate-700"
            disabled={ addStudentEnabled()} 
            onClick={addStudent}

          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              // fill="#000000" 
              height="24px" 
              width="24px" 
              version="1.1" viewBox="0 0 512 512" 
              enable-background="new 0 0 512 512"
              class="fill-white"
            >
              <g>
                <g>
                  <path d="M256,11C120.9,11,11,120.9,11,256s109.9,245,245,245s245-109.9,245-245S391.1,11,256,11z M256,460.2    c-112.6,0-204.2-91.6-204.2-204.2S143.4,51.8,256,51.8S460.2,143.4,460.2,256S368.6,460.2,256,460.2z"/>
                  <path d="m357.6,235.6h-81.2v-81.2c0-11.3-9.1-20.4-20.4-20.4-11.3,0-20.4,9.1-20.4,20.4v81.2h-81.2c-11.3,0-20.4,9.1-20.4,20.4s9.1,20.4 20.4,20.4h81.2v81.2c0,11.3 9.1,20.4 20.4,20.4 11.3,0 20.4-9.1 20.4-20.4v-81.2h81.2c11.3,0 20.4-9.1 20.4-20.4s-9.1-20.4-20.4-20.4z"/>
                </g>
              </g>
            </svg>
            <p class="px-2 text-sm">Add Code</p>
          </button>
          </div>
          <br />
        </div>
        <div class="flex justify-center mt-4">

          <button 
            id="checkout"
            disabled={addStudentEnabled()}
            class="bg-green-700 rounded-full shadow px-4 py-2 w-80 text-white justify-center border border-green-900 dark:border-slate-400 disabled:bg-slate-400 dark:disabled:bg-slate-700 text-2xl disabled:text-slate-300"
            onclick={ checkout }
          >
            Checkout
          </button>
          </div>
          <div> 
            <br/>
          </div>
          <div class="mt-2">
            <h3 id="AENoticeAnchor" class="text-center text-xl bold pb-1">Academic Excellence Exam Grade Selection Recommendation</h3>
            <p><i>Testing provider <a href="https://www.academicexcellence.com/complete-online-california-achievement-test-timed/?attributes=eyI5NSI6IiIsIjk2IjoiIiwiOTciOiIiLCIxMDAiOiI4OCIsIjk4IjoiODciLCI5OSI6Ijg1In0" target="_blank" class="underline">Academic Excellence recommends</a> that if you are testing in the middle of the school year you select the student's current grade level, 
                if you are testing at the end of the year or between school years select the <b>next</b> grade level for your student, not the student's past grade level. 
                If you are using this exam to comply with homeschool requirements we encourage you to confirm grade level requirements according to your local regulations.</i></p>
          </div>
    </form>

    </div>
  )
}
