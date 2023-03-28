import supabase from '../components/SupabaseClient'
import type { APIRoute } from "astro";

export const post: APIRoute = async ({ request }) => {
    const formData = await request.json();
    const firstName = formData.first;
    const lastName = formData.last;
    const email = formData.email;
    const students = formData.student;

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
    // submission.students = students
    // console.log("submission:" + [submission[firstName], submission[lastName], submission[email]])


    const { error } = await supabase.from('profile').insert([submission])
    

    if (error) {
        alert(error.message)
    }

    // Do something with the formData, then return a success response
    return new Response(
      JSON.stringify({
        message: "Success!"
      }),
      { status: 200 }
    );
  };