import type { AuthSession } from '@supabase/supabase-js'
import { Component, createEffect, createSignal } from 'solid-js'
import { supabase } from './SupabaseClient'
import StudentForm from './StudentForm'

interface Props {
  session: AuthSession;
}

const OrderForm: Component = () => {
  const [firstName, setFirstName] = createSignal("")
  const [lastName, setLastName] = createSignal("")
  const [email, setEmail] = createSignal("")
  const [studentFirstName, setStudentFirsName] = createSignal<string[]>([])
  const [studentLastName, setStudentLastName] = createSignal<string[]>([])
  const [studentGrade, setStudentGrade] = createSignal<string[]>([])


  return (
    <div aria-live="polite" class="dark:text-gray-400 align-center">
      <form onSubmit={()=>{}} class="form-widget dark:bg-bg-gray">
        <div class="p-3">
          <label for="firstName" class="pr-8">First Name</label>
          <input
            id="firstName"
            type="text"
            value={""}
            onChange={(e) => setFirstName(e.currentTarget.value)}
          />
        </div>
        <div class="p-3">
          <label for="lastName" class="pr-8">Last Name</label>
          <input
            id="lastName"
            type="text"
            value={""}
            onChange={(e) => setLastName(e.currentTarget.value)}
          />
        </div>
        <div class="p-3">
          <label for="email" class="pr-4">Email</label>
          <input
            id="email"
            type="text"
            value={''}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <hr />
        <h3>Your Students</h3>
        <div>
          <StudentForm />
        </div>
      </form>
    </div>
  )
}

export default OrderForm