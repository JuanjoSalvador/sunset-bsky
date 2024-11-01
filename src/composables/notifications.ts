import type { AppBskyNotificationListNotifications } from '@atproto/api'

interface QueryParams {
    limit?: AppBskyNotificationListNotifications.QueryParams['limit'],
    cursor?: AppBskyNotificationListNotifications.QueryParams['cursor']
}

export async function useNotifications(queryParams: QueryParams) {
  const nuxtApp = useNuxtApp()
  const bskyAgent = nuxtApp.$agent

  try {
    const query: QueryParams = {
      limit: toValue(queryParams.limit),
      cursor: toValue(queryParams.cursor),
    }

    const response: AppBskyNotificationListNotifications.Response = 
      await bskyAgent.listNotifications(query)
        .then((res) => res)
        .catch((error) => error)

    return {
      "cursor": response.data.cursor,
      "notifications": response.data.notifications
    }
    
  } catch (error) {
    console.log("[Notifications] An error ocurred!", error)
  }
}