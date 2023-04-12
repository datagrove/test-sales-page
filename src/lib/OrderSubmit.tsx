import { loadCart } from './data';


const submit = async (e: any) => {
  const database = await fetch('/supabaseSubmit', {
    method: "POST",
    body: JSON.stringify(loadCart()),
  });
}

export default submit
