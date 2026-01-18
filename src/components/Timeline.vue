<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useFeedStore } from '~/stores/feed'
import { storeToRefs } from 'pinia'
import Post from './post/Post.vue'

const feedStore = useFeedStore()  // instanciamos el store
const { posts, loading } = storeToRefs(feedStore)  // reactive refs del store

// Infinite scroll
const observer = ref<IntersectionObserver | null>(null)

onBeforeMount(async () => await feedStore.fetchFeed())

onMounted(() => {
  // Configurar IntersectionObserver para infinite scroll
  observer.value = new IntersectionObserver(async (entries) => {
    if (entries[0].isIntersecting && !loading) {
      await feedStore.fetchFeed()  // fetch de siguiente página
    }
  }, { rootMargin: '100px 0px' })

  observer.value.observe(document.querySelector('#endOfList')!)
})
</script>

<template>
  <ul>
    <Post v-for="post in posts" :key="post.post.uri" :post="post" :agent="$agent"/>
  </ul>

  <div id="endOfList" />
</template>