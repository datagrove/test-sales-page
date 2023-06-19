import supabase from '../components/SupabaseClient'
import type { APIRoute } from "astro";

export const post: APIRoute = async ({ request }) => {
  const formData = await request.json();
  console.log("Form Data: " + JSON.stringify(formData))
  const firstName = formData.first;
  const lastName = formData.last;
  const email = formData.email;
  const students = formData.student;
  console.log("Students before Profile:" + JSON.stringify(students))

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
  console.log("Profile Submission: " + JSON.stringify(submission))

  const { error, data } = await supabase.from('profile').insert([submission]).select()

  if (error) {
    return new Response(
      JSON.stringify({
        message: "Error creating profile",
      }),
      { status: 500 }
    );
  } else if (!data) {
    return new Response(
      JSON.stringify({
        message: "No profile Data",
      }),
      { status: 500 }
    );
  } else {
    console.log("Profile Data: " + JSON.stringify(data))
    const order_number = data[0].order_number

    console.log("Order Number: " + order_number)

    const studentList: any = []

    // let studentSubmission: any = {}
    console.log("Students after Profile: " + JSON.stringify(students))
    students.forEach(async (element: { first: string; last: string; grade: number; }) => {
      let studentSubmission: any = {}
      console.log("Student Submission: " + JSON.stringify(studentSubmission))

      studentSubmission.order_number = order_number
      studentSubmission.studentFirstName = element.first
      studentSubmission.studentLastName = element.last
      studentSubmission.grade = element.grade
      studentList.push(studentSubmission)
      console.log("Student List:" + JSON.stringify(studentList))
      console.log("Student Submission: " + JSON.stringify(studentSubmission))

      // const { data, error } = await supabase.from('Test_Info').insert([studentSubmission]).select()

      // console.log("Student Data: " + JSON.stringify(data))

      // if (error) {
      //   return new Response(
      //     JSON.stringify({
      //       message: "Error creating student entries",
      //     }),
      //     { status: 500 }
      //   );
      // } else if (!data) {
      //   return new Response(
      //     JSON.stringify({
      //       message: "No Student Data",
      //     }),
      //     { status: 500 }
      //   );
      // }
    })

    const {data:studentData, error} = await supabase.from('Test_Info').insert(studentList).select()

    console.log("Student Data: " + JSON.stringify(studentData))   

    if (error) {
        return new Response(
          JSON.stringify({
            message: "Error creating student entries",
          }),
          { status: 500 }
        );
      }

    // Do something with the formData, then return a success response
    return new Response(
      JSON.stringify({
        message: "Success!",
        order_number: order_number,
      }),
      { status: 200 }
    );
  }
};