import { Component, createSignal, For } from 'solid-js';
import { createStore } from 'solid-js/store';

const StudentForm: Component = () => {
    const [studentFirstName, setStudentFirstName] = createSignal("")
    const [studentLastName, setStudentLastName] = createSignal("")
    const [allStudents, setAllStudents] = createSignal<string[]>([])
    // const [studentGrade, setStudentGrade] = createSignal<string[]>([])

    let input: any;
    let studentID: number = 0;
    const [students, setStudents] = createStore({
        students: [
            { firstName: 'Meagan', lastName: 'Smith'},
            { firstName: "Josh", lastName: "Fletcher"}
        ]
    })

    const addStudent = (text: string) => {
        // alert("In the addStudent function")
        console.log("text: ", text)
        // setStudents([...students, { studentID: ++studentID, text}])
    }



    function handleSubmit() {
        // setStudentFirstName("")
        // setAllStudents(allStudents => ['test', ...allStudents])
        // console.log({ allStudents })
        setAllStudents(["an", "array", "of", "strings"])
        // setAllStudents([newStudent(), ...allStudents()])
        console.log({ allStudents })
        console.log({ students })
    }


    
    return (
        <div>

            <div>
                <input ref={ input } />
                <button
                    onClick={(e) => {
                        // alert("button clicked")
                        console.log( input.value )
                        if(!input.value.trim()) return;
                        addStudent(input.value);
                        input.value = "";
                    }}
                    class="rounded-full bg-purple-200 px-4 py-1 border-2 border-gray-500"
                >
                    Add New Student
                </button>
            </div>

            <For each={ students }>
                {( student ) => {
                    const { id, text } = student;
                    console.log(`Creating ${ text }`)
                    return (
                        <div>
                            <span>{ text }</span>
                        </div>
                    )
                }}
            </For>


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
                    onClick = { handleSubmit({ studentFirstName }) }


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