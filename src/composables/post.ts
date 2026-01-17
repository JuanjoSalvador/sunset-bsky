import type { ComAtprotoRepoCreateRecord } from '@atproto/api'
import { useFeedStore } from '~/stores/feed'

export async function usePost(inputSchema: ComAtprotoRepoCreateRecord.InputSchema) {
  const nuxtApp = useNuxtApp()
  const sessionStore = useSessionStore()
  const bskyAgent = nuxtApp.$agent

  const currentUserDid = sessionStore.getSession().did
  const currentUser = await nuxtApp.$agent.getProfile({'actor': currentUserDid})

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

    if (response?.data?.uri) {
      const feedStore = useFeedStore()
      feedStore.posts.unshift({
        post: {
          uri: response.data.uri,
          cid: response.data.cid,
          author: {
            did: currentUser.data.did,
            handle: currentUser.data.handle,
            displayName: currentUser.data.displayName,
            avatar: currentUser.data.avatar
          },
          record: input.record,
          indexedAt: ''
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