import type { AppBskyFeedGetTimeline } from '@atproto/api'
import { useFeedStore } from '~/stores/feed'

interface QueryParams {
    algorithm?: AppBskyFeedGetTimeline.QueryParams['algorithm'],
    limit?: AppBskyFeedGetTimeline.QueryParams['limit'],
    cursor?: AppBskyFeedGetTimeline.QueryParams['cursor']
}

export async function resumeSession() {
  const nuxtApp = useNuxtApp()
  const bskyAgent = nuxtApp.$agent
  const sessionStore = useSessionStore()
  const savedSessionData = sessionStore.getSession()

    if (savedSessionData)
      await bskyAgent.resumeSession(savedSessionData)
}


export async function useTimeline(queryParams: QueryParams) {
  try {
    await resumeSession()
    await useFeedStore().fetchFeed()
  } catch (error) {
    console.log("[Timeline] An error ocurred!", error)
  }
}