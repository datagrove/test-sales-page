import { Component, createEffect, createSignal } from 'solid-js'
import { supabase } from './SupabaseClient'



const StudentForm: Component = ({onSubmit}: props) => {
    const [studentFirstName, setStudentFirstName] = createSignal<string>('')
    const [studentLastName, setStudentLastName] = createSignal<string>('')
    const [studentGrade, setStudentGrade] = createSignal<string>('')
  
  
    return (
      <div aria-live="polite" class="dark:text-gray-400 align-center">
        <form onSubmit={()=>{}} class="form-widget dark:bg-bg-gray">
          <div class="p-3">
            <label for="studentFirstName" class="pr-8">Student First Name</label>
            <input
              id="studentFirstName"
              type="text"
              value={[]}
              required
              onChange={(e) => setStudentFirstName(e.currentTarget.value)}
            />
          </div>
          <div class="p-3">
            <label for="studentLastName" class="pr-8">Last Name</label>
            <input
              id="studentLastName"
              type="text"
              value={""}
              required
              onChange={(e) => setStudentLastName(e.currentTarget.value)}
            />
          </div>
          <div class="p-3">
            <label for="studentGrade" class="pr-4">Student Grade</label>
            <input
              id="studentGrade"
              type="number"
              value={''}
              required
              min = "2"
              max = "12"
              onChange={(e) => setStudentGrade(e.currentTarget.value)}
            />
          </div>
          <button 
          disabled={studentFirstName() === '' || studentLastName() === '' || studentGrade() === '' || studentFirstName() == null || studentLastName() == null || studentGrade() == null}
          onClick={() => {
              onSubmit(studentFirstName())
              onSubmit(studentLastName())
              onSubmit(studentGrade())
              setStudentFirstName('')
              setStudentLastName('')
              setStudentGrade('')
          }}
          >
            Add
            </button>
        </form>
      </div>
    )
  }

export default StudentForm