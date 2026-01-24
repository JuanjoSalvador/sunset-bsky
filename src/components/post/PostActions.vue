<!-- eslint-disable no-console -->
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useSessionStore } from '@/stores/session'

const props = defineProps({
  postCid: {
    type: String,
    required: true,
  },
  likeUri: {
    type: String,
  },
  repostUri: {
    type: String,
  },
  postUri: {
    type: String,
    required: true,
  },
})

const emits = defineEmits(['likeToggled', 'repostToggled'])

const toast = useToast()
const sessionStore = useSessionStore()
const nuxtApp = useNuxtApp()
const bskyAgent = nuxtApp.$agent

const localLikeUri = ref<string | null | undefined>(props.likeUri)
const localRepostUri = ref<string | null | undefined>(props.repostUri || null)
const isLiked = ref(!!props.likeUri)
const isReposted = ref(!!props.repostUri)

watchEffect(() => {
  if (sessionStore.isSessionLoaded)
    bskyAgent.resumeSession(sessionStore.session)
})

async function toggleLike() {
  if (!sessionStore.session)
    return

  if (isLiked.value && localLikeUri.value) {
    await bskyAgent.deleteLike(localLikeUri.value)
    toast.info({title: "Like removed", message: "Like removed successfully"})
    localLikeUri.value = null
    isLiked.value = false
    emits('likeToggled', null)
  }
  else {
    const response = await bskyAgent.like(props.postUri, props.postCid)
    if (response && response.uri) {
      localLikeUri.value = response.uri
      emits('likeToggled', response.uri)
      isLiked.value = true
    }
    else {
      toast.error({title: 'Like failed', message: 'Something went wrong while liking this post.'})
      emits('likeToggled', null)
    }
  }
}

async function toggleRepost() {
  if (!sessionStore.session)
    return

  if (isReposted.value && localRepostUri.value) {
    await bskyAgent.deleteRepost(localRepostUri.value)
    toast.success({ title: 'Success!', message: 'Successfully deleted repost.' })
    localRepostUri.value = null
    isReposted.value = false
    emits('repostToggled', null)
  }
  else {
    const response = await bskyAgent.repost(props.postUri, props.postCid)
    if (response && response.uri) {
      toast.success({ title: 'Success!', message: 'Successfully reposted post.' })
      localRepostUri.value = response.uri
      emits('repostToggled', response.uri)
      isReposted.value = true
    } else {
      toast.error({title: 'Repost failed', message: 'Something went wrong while reposting this post.'})
      console.error('Repost response does not contain the expected structure.')
      emits('repostToggled', null)
    }
  }
}
</script>

<template>
  <div class="columns is-centered action-buttons is-mobile">
    <div class="column has-text-centered">
      <div>
        <button class="button">
          <font-awesome :icon="['far', 'comment']" />
        </button>
      </div>
    </div>
    <div class="column has-text-centered">
      <button class="button" :class="{ 'text-green': isReposted }" @click="toggleRepost">
        <font-awesome :icon="['fas', 'repeat']" />
      </button>
    </div>
    <div class="column has-text-centered">
      <button class="button"  @click="toggleLike">
        <font-awesome :icon="['far', 'heart']" v-if="!isLiked" />
        <font-awesome :icon="['fas', 'heart']" class="text-red" v-if="isLiked" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.text-green {
  color: green;
}

.text-red {
  color:brown;
}

.button {
  border: none !important;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}

.button:active {
  transform: scale(0.96);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>