<script setup lang="ts">
import { useSessionStore } from '~/stores/session'

const nuxtApp = useNuxtApp()
const bskyAgent = nuxtApp.$agent
const sessionStore = useSessionStore()
const route = useRoute()

const loading = ref(false)
const cursor = ref<string | null>(null)
const endReached = ref(false)
const observer = ref<IntersectionObserver | null>(null)
const timelineData = ref<Array<any>>([])

const userHandle = route.params.handle as string

async function fetchData(cursorValue?: string | null) {
  try {
    loading.value = true

    console.log("Updating data from Bsky")

    const response = cursorValue === null
      ? await bskyAgent.getAuthorFeed({ actor: userHandle, limit: 50 })
      : await bskyAgent.getAuthorFeed({ actor: userHandle, cursor: cursorValue, limit: 50 })

    // Skip replies and reposts from current user
    const filteredPosts = response.data.feed.filter(
      post => !(post.post.record as any).reply
    )

    timelineData.value = [...timelineData.value, ...filteredPosts]

    if (response.data.cursor) {
      cursor.value = response.data.cursor
      endReached.value = false // There's more data to load
    } else {
      endReached.value = true // We've reached the end
      if (observer.value)
        observer.value.unobserve(document.querySelector('#endOfList')!)
    }
  }

  catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Failed:', error.message)
      if (error.message.includes('Authentication Required'))
        sessionStore.clearSession()
    }
    else {
      console.error('An unexpected error occurred:', error)
    }
  }

  finally {
    loading.value = false
  }
}

onBeforeMount(() => {
    fetchData()
})
</script>

<template>
    <ul>
        <Post v-for="post in timelineData" :key="post.post.record.cid" :post="post" :agent="bskyAgent" />
    </ul>
</template>

<style scoped>
</style>