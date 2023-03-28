import supabase from '../components/SupabaseClient'
import type { APIRoute } from "astro";

// const form = document.querySelector('#checkout')
// form?.addEventListener('click', async (e) => {
//     e.preventDefault()

//     const formInputs = form?.querySelectorAll('input')

//     let submission: any = {}

//     formInputs.forEach(element => {
//         const { value, name } = element
//         if(value){
//             submission[name] = value
//         }
//     })

//     const {formData, error } = await supabase.from('profile').insert([submission])

//     if (error) {
//         throw error
//     } else {
//         alert(formData)
//     }
// })

export const post: APIRoute = async ({ request }) => {
    const formData = await request.formData();
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const students = formData.get("student");

    console.log(students)

    // Validate the formData - you'll probably want to do more than this
    if (!firstName || !email || !lastName || !students) {
      return new Response(
        JSON.stringify({
          message: "Missing required fields",
        }),
        { status: 400 }
      );
    }
    
    let submission: any = {}

    submission.firstName = firstName
    submission.lastName = lastName
    submission.email = email
    submission.students = students


    const { data , error } = await supabase.from('profile').insert([submission])

    // Do something with the formData, then return a success response
    return new Response(
      JSON.stringify({
        message: "Success!"
      }),
      { status: 200 }
    );
  };