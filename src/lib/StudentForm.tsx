import type { Component } from 'solid-js'
import type { Student } from './data'

interface Props {
    onRemove: () => void
    setStudent: (s: Student)=>void
    student: ()=>Student
  }

const StudentForm: Component<Props> = (props: Props ) => {
    const update = (p: Partial<Student>) => {
      props.setStudent({
        ...props.student(),
        ...p
      })
    }
    return (
      <div aria-live="polite" class="dark:text-gray-400 align-center my-5 border-2 border-gray-300 m-4 p-4 rounded shadow-xl">
          <div class="p-3">
            {/* <label for="studentFirstName" class="pr-8">Student First Name</label> */}
            <input
              id="studentFirstName"
              class="pl-1 border-b-2 border-gray-500 bg-transparent placeholder-gray-400 dark:placeholder-gray-500 w-full"
              placeholder='Student First Name'
              type="text"
              required
              value={props.student().first}
              
              onChange={(e) => update( { first: e.currentTarget.value})}
            />
          </div>
          <div class="p-3">
            {/* <label for="studentLastName" class="pr-8">Last Name</label> */}
            <input
              id="studentLastName"
              class="pl-1 border-b-2 border-gray-500 bg-transparent placeholder-gray-400 dark:placeholder-gray-500 w-full"
              type="text"
              placeholder='Student Last Name'
              required
              value={props.student().last}
              
              onChange={(e) => update({ last: e.currentTarget.value})}
            />
          </div>
          <div class="p-3">
            {/* <label for="studentGrade" class="pr-4">Student Grade</label> */}
            <input
              id="studentGrade"
              class="pl-1 border-b-2 border-gray-500 bg-transparent placeholder-gray-400 dark:placeholder-gray-500 w-full"
              type="number"
              placeholder='Student Grade'
              required
              value={props.student().grade}
              min = "2"
              max = "12"
              onChange={(e) => update({grade: e.currentTarget.value})}
            />
          </div>
          <button 
          onClick={props.onRemove}
          >
            Remove
            </button>

      </div>
    )
  }

export default StudentForm