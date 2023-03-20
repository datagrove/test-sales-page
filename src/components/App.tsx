import { Component, createEffect, createSignal } from 'solid-js'
import { supabase } from './SupabaseClient'
import type { AuthSession } from '@supabase/supabase-js'
import Account from './Account'
import Auth from './SupabaseLogin'

const App: Component = () => {
  const [session, setSession] = createSignal<AuthSession | null>(null)

  createEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  })

  return (
    <div class="container" style={{ padding: '50px 0 100px 0' }}>
      {!session() ? <Auth /> : <Account session={session()!} />}
    </div>
  )
}

export default App