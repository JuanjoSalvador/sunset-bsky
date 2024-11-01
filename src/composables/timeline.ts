import type { AppBskyFeedGetTimeline } from '@atproto/api'

interface QueryParams {
    algorithm?: AppBskyFeedGetTimeline.QueryParams['algorithm'],
    limit?: AppBskyFeedGetTimeline.QueryParams['limit'],
    cursor?: AppBskyFeedGetTimeline.QueryParams['cursor']
}

export async function useTimeline(queryParams: QueryParams) {
  const nuxtApp = useNuxtApp()
  const bskyAgent = nuxtApp.$agent

  
  try {
    const query: QueryParams = {
      algorithm: toValue(queryParams.algorithm),
      limit: toValue(queryParams.limit),
      cursor: toValue(queryParams.cursor)
    }
    const response: AppBskyFeedGetTimeline.Response = 
      await bskyAgent.app.bsky.feed.getTimeline(query)
        .then((res) => res)
        .catch((error) => error)

      return {
        "cursor": response.data.cursor,
        "feed": response.data.feed
      }

    } catch (error) {
      console.log("[Timeline] An error ocurred!", error)
    }
  }