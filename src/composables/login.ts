import type { ComAtprotoServerCreateSession } from '@atproto/api'

interface Options {
    identifier: MaybeRefOrGetter<ComAtprotoServerCreateSession.InputSchema['identifier']>
    password: MaybeRefOrGetter<ComAtprotoServerCreateSession.InputSchema['password']>
}

export const useLogin = (options: Options) => {
  const nuxtApp = useNuxtApp()
  const bskyAgent = nuxtApp.$agent

  return useAsyncData(async () => {
    try {
      const { data } = await bskyAgent.login({
        identifier: toValue(options.identifier),
        password: toValue(options.password)
      })

      return data.value

    } catch (e) {
        console.log(e)
    }
  })
}