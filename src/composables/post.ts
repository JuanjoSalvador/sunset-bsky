import type { ComAtprotoRepoCreateRecord } from '@atproto/api'
import { useFeedStore } from '~/stores/feed'

export async function usePost(inputSchema: ComAtprotoRepoCreateRecord.InputSchema) {
  const nuxtApp = useNuxtApp()
  const bskyAgent = nuxtApp.$agent

  try {
    const input: ComAtprotoRepoCreateRecord.InputSchema = {
      repo: toValue(inputSchema.repo),
      collection: toValue(inputSchema.collection),
      record: toValue(inputSchema.record)
    }

    const response: ComAtprotoRepoCreateRecord.Response =
      await bskyAgent.com.atproto.repo.createRecord(input)
        .then((res) => res)
        .catch((error) => {
          console.error("[Timeline] Post failed:", error)
          throw error
        })

    // ✅ Verificamos que hay datos válidos antes de refrescar el feed
    if (response?.data?.uri) {
      const feedStore = useFeedStore()
      feedStore.posts.unshift({
        post: {
          uri: response.data.uri,
          cid: response.data.cid,
          record: input.record
        }
      })
      console.log("Post insertado en la TL")
      feedStore.fetchFeed()
    }

    return {
      uri: response.data.uri,
      cid: response.data.cid,
      commit: response.data.commit
    }
  } catch (error) {
    console.error("[Timeline] An error occurred!", error)
  }
}