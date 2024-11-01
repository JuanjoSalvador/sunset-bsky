import { useSessionStore } from '~/stores/session'
import type { AppBskyFeedGetFeed } from '@atproto/api'

interface Options {
  feed: MaybeRefOrGetter<AppBskyFeedGetFeed.QueryParams['feed']>
  limit?: MaybeRefOrGetter<AppBskyFeedGetFeed.QueryParams['limit']>
  cursor?: MaybeRefOrGetter<AppBskyFeedGetFeed.QueryParams['cursor']>
}

export async function resumeSession() {
  const sessionStore = useSessionStore()
  const nuxtApp = useNuxtApp()
  const bskyAgent = nuxtApp.$agent

  const savedSessionData = sessionStore.getSession()

    if (savedSessionData)
      await bskyAgent.resumeSession(savedSessionData)
}

export function useFeed(options: Options) {
  const nuxtApp = useNuxtApp()
  const bskyAgent = nuxtApp.$agent

  return useAsyncData(async () => {
    const { data } = await bskyAgent.app.bsky.feed.getFeed({
      feed: toValue(options.feed),
      limit: toValue(options.limit),
      cursor: toValue(options.cursor),
    })

    return data.feed
  })
}
