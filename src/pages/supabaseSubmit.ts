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
    
    const { error, data } = await supabase.from('profile').insert([submission]).select()

    if (error) {
        alert(error.message)
    }

    if (!data){
        return new Response(
            JSON.stringify({
                message: "Error creating profile",
            }),
            { status: 500 }
        );
    } else {
    console.log(data[0].order_number)
    const order_number = data[0].order_number
    

    // let studentSubmission: any = {}
    
    students.forEach(async (element: { first: string; last: string; grade: number; }) => {
        let studentSubmission: any = {}
        
        studentSubmission.order_number = order_number
        studentSubmission.studentFirstName = element.first
        studentSubmission.studentLastName = element.last
        studentSubmission.grade = element.grade
    
        const { error: studentError, data: studentData } = await supabase.from('Test_Info').insert([studentSubmission])

        if (studentError) {
            alert(studentError.message)
        }

    });

    // Do something with the formData, then return a success response
    return new Response(
      JSON.stringify({
        message: "Success!"
      }),
      { status: 200 }
    );
  }};