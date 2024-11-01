<script setup lang="ts">
import { useSessionStore } from '~/stores/session'
import Post from './post/Post.vue';

const nuxtApp = useNuxtApp()
const bskyAgent = nuxtApp.$agent
const sessionStore = useSessionStore()

const loading = ref(false)
const timelineData = ref<Array<any>>([])
const cursor = ref<string | undefined>(undefined)
const observer = ref<IntersectionObserver | null>(null)

const savedSessionData = sessionStore.getSession()

async function resumeSession() {
  if (savedSessionData)
    await bskyAgent.resumeSession(savedSessionData)
}

async function fetchData(cursorValue?: string | '') {
  loading.value = true

  try {
    let options = cursorValue === null
      ? {'limit': 20}
      : {'limit': 20, 'cursor': cursorValue}

    const response = await useTimeline(options)

    const filteredPosts = response?.feed.filter(
      post => !(post.post.record as any).reply || !(post.reason?.by?.did == savedSessionData?.did)
    )

    timelineData.value = [...timelineData.value, ...(filteredPosts || [])]
    
    if (response?.cursor) {
      cursor.value = response?.cursor
    } else {
      if (observer.value)
        observer.value.unobserve(document.querySelector('#endOfList')!)
    }
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
  <ul>
    <Post v-for="post in timelineData" :post="post" :agent="bskyAgent"/>
  </ul>
  
  <div id="endOfList" />
</template>

<style scoped>
</style>