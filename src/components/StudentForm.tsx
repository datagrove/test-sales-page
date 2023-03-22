import { Component, createSignal } from 'solid-js';

const StudentForm: Component = () => {
    const [studentFirstName, setStudentFirstName] = createSignal("")
    const [studentLastName, setStudentLastName] = createSignal("")
    const [allStudents, setAllStudents] = createSignal<string[]>([])
    // const [studentGrade, setStudentGrade] = createSignal<string[]>([])

    function handleSubmit(e) {
        // setStudentFirstName("")
        // setAllStudents(allStudents => ['test', ...allStudents])
        // console.log({ allStudents })
        setAllStudents(["an", "array", "of", "strings"])
        setAllStudents()
        console.log({ allStudents })
    }
    
    return (
        <div>
            <div class="p-3">
                <label for="firstName" class="pr-8">First Name</label>
                <input
                    id="firstName"
                    type="text"
                    value={""}
                    onChange={(e) => setStudentFirstName(e.currentTarget.value)}
                />
            </div>
            <div class="p-3">
                <label for="lastName" class="pr-8">Last Name</label>
                <input
                    id="lastName"
                    type="text"
                    value={""}
                    onInput={(e) => setStudentLastName(e.currentTarget.value)}
                />
            </div>
            <div>
                <button 
                    type="button"
                    class="rounded-full bg-green-200 px-4 py-1 border-2 border-gray-500"
                    // onClick={ () => setStudentFirstName((name) => name + "oopsy") }
                    onClick = { handleSubmit }


                >
                    Add Student
                </button>
            </div>

            <div>
                { studentFirstName }
                <br />
            </div>
        </div>
    )
}

export default StudentForm;