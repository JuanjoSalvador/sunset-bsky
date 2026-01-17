<script setup lang="ts">
import { useSessionStore } from '~/stores/session'
import NotificationItem from './notifications/NotificationItem.vue';

const nuxtApp = useNuxtApp()
const bskyAgent = nuxtApp.$agent
const sessionStore = useSessionStore()

const loading = ref(false)
const notificationsData = ref<Array<any>>([])
const cursor = ref<string | undefined>(undefined)
const endReached = ref(false)
const observer = ref<IntersectionObserver | null>(null)

const savedSessionData = sessionStore.getSession()

async function resumeSession() {
  if (savedSessionData)
    await bskyAgent.resumeSession(savedSessionData)
}

async function fetchData(cursorValue?: string | null) {
  loading.value = true

  try {
    let options = cursorValue === null
      ? {'limit': 20}
      : {'limit': 20, 'cursor': cursorValue}

    await useNotifications(options).then(response => {
      notificationsData.value = [...(response?.notifications || [])]
    
      if (response?.cursor) {
        cursor.value = response?.cursor
      } else {
        if (observer.value)
         observer.value.unobserve(document.querySelector('#endOfList')!)
      }
    }
  )
    
    
  } catch (error) {
    console.log("An error ocurred!", error)
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
  <h1 class="title is-3">Notifications</h1>
  <ul>
    <NotificationItem v-for="notification in notificationsData" :value="notification" />
  </ul>

  <div id="endOfList" />
</template>

<style scoped>
</style>