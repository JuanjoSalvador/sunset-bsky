<script setup lang="ts">
import { useSessionStore } from '~/stores/session'
import NotificationItem from './notifications/NotificationItem.vue';

const nuxtApp = useNuxtApp()
const bskyAgent = nuxtApp.$agent
const sessionStore = useSessionStore()

const loading = ref(false)
const notificationsData = ref<Array<any>>([])
const cursor = ref<string | null>(null)
const observer = ref<IntersectionObserver | null>(null)

const savedSessionData = sessionStore.getSession()

async function resumeSession() {
  if (savedSessionData)
    await bskyAgent.resumeSession(savedSessionData)
}

async function fetchData(cursorValue?: string | null) {
  loading.value = true

  try {
    const options = { 
      limit: 20, 
      ...(cursorValue ? { cursor: cursorValue } : {}) 
    }

    const response = await useNotifications(options)
    
    if (response?.notifications) {
      // Carga notificaciones reemplazando el valor inicial (null) si no hay datos, o concatenando si hay.
      if (!cursorValue) {
        notificationsData.value = response.notifications
      } else {
        notificationsData.value = [...notificationsData.value, ...response.notifications]
      }
    }

    // Manejo del cursor y observador. Limpia el cursor si no hay más datos, y desconecta.
    if (response?.cursor) {
      cursor.value = response.cursor
    } else {
      cursor.value = null
      if (observer.value) {
        observer.value.disconnect()
      }
    }
    
  } catch (error) {
    console.error("An error occurred!", error)
  } finally {
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
    fetchData(cursor.value)
  }, {
      rootMargin: '100px 0px',
  })

  observer.value.observe(document.querySelector('#endOfList')!)
})
</script>

<template>
  <ul>
    <NotificationItem v-for="notification in notificationsData" :value="notification" />
  </ul>

  <div id="endOfList" />
</template>

<style scoped>
</style>