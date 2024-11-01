import type { ComAtprotoRepoCreateRecord } from '@atproto/api'

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
        .catch((error) => error)

      return {
        "uri": response.data.uri,
        "cid": response.data.cid,
        "commit": response.data.commit
      }

    } catch (error) {
      console.log("[Timeline] An error ocurred!", error)
    }
  }