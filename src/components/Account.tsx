import type { AuthSession } from '@supabase/supabase-js'
import { Component, createEffect, createSignal } from 'solid-js'
import  supabase from './SupabaseClient'

interface Props {
  session: AuthSession;
}

const Account: Component<Props> = ({ session }) => {
  const [loading, setLoading] = createSignal(true)
  const [username, setUsername] = createSignal<string | null>(null)
  const [website, setWebsite] = createSignal<string | null>(null)
  const [avatarUrl, setAvatarUrl] = createSignal<string | null>(null)

  createEffect(() => {
    getProfile()
  })

  const getProfile = async () => {
    try {
      setLoading(true)
      const { user } = session

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (e: Event) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { user } = session

      const updates = {
        id: user.id,
        username: username(),
        website: website(),
        avatar_url: avatarUrl(),
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div aria-live="polite" class="dark:text-gray-400 align-center">
      <form onSubmit={updateProfile} class="form-widget dark:bg-bg-gray">
        <div class="p-3">Email: {session.user.email}</div>
        <div class="p-3">
          <label for="username" class="pr-8">Name</label>
          <input
            id="username"
            type="text"
            value={username() || ''}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
        </div>
        <div class="p-3">
          <label for="website" class="pr-4">Website</label>
          <input
            id="website"
            type="text"
            value={website() || ''}
            onChange={(e) => setWebsite(e.currentTarget.value)}
          />
        </div>
        <div class="p-3">
          <button type="submit" class="button bg-transparent hover:bg-blue-500 dark:hover:bg-black text-blue-700 dark:text-gray-400 font-semibold hover:text-white dark:hover:text-white py-2 px-4 border-2 border-blue-500 dark:border-gray-400 hover:border-transparent rounded" disabled={loading()}>
            {loading() ? 'Saving ...' : 'Update profile'}
          </button>
        </div>
        <div class="p-3">
        <button type="button" class="button bg-transparent hover:bg-blue-500 dark:hover:bg-black text-blue-700 dark:text-gray-400 font-semibold hover:text-white dark:hover:text-white py-2 px-4 border-2 border-blue-500 dark:border-gray-400 hover:border-transparent rounded" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
        </div>
      </form>
    </div>
  )
}

export default Account