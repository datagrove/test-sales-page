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
      <div aria-live="polite" class="dark:text-gray-400 align-center">
          <div class="p-3">
            <label for="studentFirstName" class="pr-8">Student First Name</label>
            <input
              id="studentFirstName"
              type="text"
              value={props.student().first}
              
              onChange={(e) => update( { first: e.currentTarget.value})}
            />
          </div>
          <div class="p-3">
            <label for="studentLastName" class="pr-8">Last Name</label>
            <input
              id="studentLastName"
              type="text"
              value={props.student().last}
              
              onChange={(e) => update({ last: e.currentTarget.value})}
            />
          </div>
          <div class="p-3">
            <label for="studentGrade" class="pr-4">Student Grade</label>
            <input
              id="studentGrade"
              type="number"
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