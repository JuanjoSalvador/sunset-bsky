import { defineStore } from 'pinia'
import type { AppBskyFeedGetFeed } from '@atproto/api'
import { useNuxtApp } from '#app'

export const useFeedStore = defineStore('feed', {
  state: () => ({
    posts: [] as AppBskyFeedGetFeed.Response['data']['feed'],
    loading: false,
  }),

  actions: {
    async fetchFeed() {
      const { $agent } = useNuxtApp()
      const sessionStore = useSessionStore()
      const savedSessionData = sessionStore.getSession()

      if (savedSessionData)
        await $agent.resumeSession(savedSessionData)

      this.loading = true

      try {
        const result = await $agent.getTimeline({
          limit: 50, // puedes ajustar
        })
        this.posts = result.data.feed
      } catch (err) {
        console.error('Error fetching feed:', err)
      } finally {
        this.loading = false
      }
    },
  },
})
