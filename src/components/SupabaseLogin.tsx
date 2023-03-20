
import { createSignal } from 'solid-js'
import { supabase } from './SupabaseClient'

export default function Auth() {
  const [loading, setLoading] = createSignal(false)
  const [email, setEmail] = createSignal('')

  const handleLogin = async (e: SubmitEvent) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({ email: email() })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div class="row flex-center flex dark:bg-bg-gray">
      <div class="col-6 form-widget dark:text-gray-400" aria-live="polite">
        <p class="description py-2">Sign in via magic link with your email below</p>
        <form class="form-widget" onSubmit={handleLogin}>
          <div>
            <label for="email" class="pr-4">Email</label>
            <input
              id="email"
              class="inputField px-1 w-fit"
              type="email"
              placeholder="Your email"
              value={email()}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
          <div class="p-3">
            <button type="submit" class="button bg-transparent hover:bg-blue-500 dark:hover:bg-black text-blue-700 dark:text-gray-400 font-semibold hover:text-white dark:hover:text-white py-2 px-4 border-2 border-blue-500 dark:border-gray-400 hover:border-transparent rounded" aria-live="polite">
              {loading() ? <span>Loading</span> : <span>Send magic link</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

