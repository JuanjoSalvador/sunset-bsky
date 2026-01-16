import { AtpAgent } from '@atproto/api'
import { useSessionStore } from '~/stores/session'

export default defineNuxtPlugin((nuxtApp) => {
    const sessionStore = useSessionStore()

    const agent = new AtpAgent({
      service: 'https://bsky.social',
      persistSession: (_evt, sess) => {
        sessionStore.setSession(sess)
      },
    })

    return {
      provide: {
        agent
      }
    }
})