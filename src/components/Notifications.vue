<script setup lang="ts">
import { useSessionStore } from '~/stores/session'

import Notification from './Notification.vue';

const nuxtApp = useNuxtApp()
const bskyAgent = nuxtApp.$bskyAgent
const sessionStore = useSessionStore()

const loading = ref(false)
const notificationsData = ref<Array<any>>([])
const cursor = ref<string | null>(null)
const endReached = ref(false)
const observer = ref<IntersectionObserver | null>(null)

const savedSessionData = sessionStore.getSession()

async function resumeSession() {
  if (savedSessionData)
    await bskyAgent.resumeSession(savedSessionData)
}

async function fetchData(cursorValue?: string | null) {
  try {
    loading.value = true

    const response = cursorValue === null
      ? await bskyAgent.listNotifications({ limit: 50 })
      : await bskyAgent.listNotifications({ cursor: cursorValue, limit: 50 })

    const notifications = response.data.notifications
    notificationsData.value = [...notificationsData.value, ...notifications]

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
  resumeSession()
  fetchData()
})

onMounted(() => {
  // Infinite scroll, loads new posts when last one has been reached
  observer.value = new IntersectionObserver(async (entries) => {
  if (entries[0].isIntersecting && !loading.value)
    await fetchData(cursor.value)
  }, {
      rootMargin: '200px 0px',
  })

  observer.value.observe(document.querySelector('#endOfList')!)
})
</script>

<template>
  <ul>
    <Notification v-for="notification in notificationsData" :value="notification" />
  </ul>
  <div id="endOfList" />
</template>