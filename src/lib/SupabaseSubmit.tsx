import supabase from '../components/SupabaseClient'

const form = document.querySelector('#checkout')
form?.addEventListener('click', async (e) => {
    e.preventDefault()

    const formInputs = form?.querySelectorAll('input')

    let submission: any = {}

    formInputs.forEach(element => {
        const { value, name } = element
        if(value){
            submission[name] = value
        }
    })

    const {data, error } = await supabase.from('profile').insert([submission])

    if (error) {
        throw error
    } else {
        alert(data)
    }
})