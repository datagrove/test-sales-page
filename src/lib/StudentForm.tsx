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
      <div aria-live="polite" class="flex flex-col dark:text-gray-400 align-center my-5 border-2 border-gray-300 dark:border-slate-400 m-4 p-4 rounded shadow-xl">
          <div class="p-3">
            {/* <label for="studentFirstName" class="pr-8">Student First Name</label> */}
            <input
              id="studentFirstName"
              class="pl-1 border-b-2 border-gray-500 bg-transparent placeholder-gray-400 dark:placeholder-gray-500 w-full"
              placeholder="Student First Name"
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
            {/* <label for="studentGrade" class="pr-4 sr-only">Student Grade</label>
            <input
              id="studentGrade"
              class="pl-1 border-b-2 border-gray-500 bg-transparent placeholder-gray-400 dark:placeholder-gray-500 w-full"
              type="number"
              placeholder='Student Grade'
              // required
              value={props.student().grade}
              min = "2"
              max = "12"
              onChange={(e) => update({grade: e.currentTarget.value})}
            /> */}
            <label class="sr-only">Select Exam Grade Level</label>
            <select
              name="grades" 
              id="studentGrade"
              class="p-1 rounded dark:bg-black dark:border dark:border-slate-400"
              value={props.student().grade}
              onChange={(e) => update({ grade: e.currentTarget.value })}
              required
            >
              <option selected disabled hidden value="">Select Exam Grade Level</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            <div>
              <br/>
            </div>
            <p><i>Note: Academic Excellence recommends that if you are testing in the middle of the school year you select the student's current grade level, 
              <u>if you are testing at the end of the year or between school years select the <b>next</b> grade level for your student</u>, not the student's past grade level. 
              If you are using this exam to comply with homeschool requirements we encourage you to confirm grade level requirements with your local regulations. </i></p>
            
            {/* <p>First Name: { props.student().first }</p>
            <p>Last Name: { props.student().last }</p>
            <p>Current grade is: { props.student().grade }</p> */}

          </div>
          <button 
          onClick={props.onRemove}
          class="self-end"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              width="24px" 
              height="24px"
              class="dark:fill-slate-400"
            >
                <path d="M 12 2 C 6.4889971 2 2 6.4889971 2 12 C 2 17.511003 6.4889971 22 12 22 C 17.511003 22 22 17.511003 22 12 C 22 6.4889971 17.511003 2 12 2 z M 12 4 C 16.430123 4 20 7.5698774 20 12 C 20 16.430123 16.430123 20 12 20 C 7.5698774 20 4 16.430123 4 12 C 4 7.5698774 7.5698774 4 12 4 z M 8.7070312 7.2929688 L 7.2929688 8.7070312 L 10.585938 12 L 7.2929688 15.292969 L 8.7070312 16.707031 L 12 13.414062 L 15.292969 16.707031 L 16.707031 15.292969 L 13.414062 12 L 16.707031 8.7070312 L 15.292969 7.2929688 L 12 10.585938 L 8.7070312 7.2929688 z"/>
            </svg>
          </button>

      </div>
    )
  }

export default StudentForm