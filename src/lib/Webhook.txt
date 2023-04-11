import { loadCart } from './data';


const submit = async (e: any) => {
  const webhook = await fetch('/webhook', {
    method: "POST",
  });
}

export default submit