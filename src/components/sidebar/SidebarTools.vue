<script setup lang="ts">
import type { ComAtprotoRepoCreateRecord } from '@atproto/api'
import { useSessionStore } from '~/stores/session'

const nuxtApp : any = useNuxtApp()
const $agent = nuxtApp.$agent

const sessionStore = useSessionStore()
const route = useRoute()
const toast = useToast()

const currentPage = ref('')

const savedSessionData = sessionStore.getSession()
if (savedSessionData)
    await $agent.resumeSession(savedSessionData)

const currentUserDid = sessionStore.getSession().did
const currentUser = await $agent.getProfile({'actor': currentUserDid})
const newPost = ref('')

// Watch for changes in the path, and update the title in the sidebar
// dynamically-
watch(() => route.name, () => {
  const titles: Record<string, string> = {
    'notifications': 'Notificaciones',
    'profile-handle': 'Perfil',
    'index': 'Inicio'
  }
  currentPage.value = titles[route.name as string] || 'Sunset'
}, { immediate: true })

function post() {
    const postSchema: ComAtprotoRepoCreateRecord.InputSchema = {
        "repo": currentUserDid,
        "collection": "app.bsky.feed.post",
        "record": {
            "$type": "app.bsky.feed.post",
            "text": newPost.value,
            "createdAt": new Date().toISOString()
        }
    }
    try {
        usePost(postSchema)
        toast.success({ title: 'Post sent!', message: 'Your post was sent successfully.' })
    } catch (error) {
        toast.error({ title: 'Something went wrong :(', message: 'Your post cannot be sent right now.' })
    }

    // Clear
    newPost.value = ''
}
</script>

<template>
    <div class="sidebar">
        <div class="page-title">
            <h1 class="title is-3">
                {{ currentPage }}
            </h1>
        </div>
        <NuxtLink :to="{
            name: 'profile-handle', 
            params: { handle: currentUser.data.handle }
        }" class="media" id="user-profile">
                <div class="media-left">
                    <figure class="image is-48x48">
                        <img :src="currentUser.data.avatar" class="is-rounded" />
                    </figure>
                </div>
                <div class="media-content">
                    <p class="title is-4">
                        <span>
                            {{ currentUser.data.displayName }}
                        </span>
                    
                    </p>
                    <p class="subtitle is-6">
                        <span>
                            @{{ currentUser.data.handle }}
                        </span>
                    </p>
                </div>
        </NuxtLink>

        <textarea class="textarea" 
            rows="10" cols="28" 
            placeholder="What's up?" 
            v-model="newPost" 
            @keydown.ctrl.enter.prevent="post()"
        ></textarea>
        <br/>
        <div class="field is-grouped is-grouped-right">
            <span class="post-length-counter" :class="{ 'has-text-danger': newPost.length > 300 }">
                {{ 300 - newPost.length }}
            </span>
            <p class="control">
                <button class="button" @click="post" :disabled="newPost.length > 300">
                    Post
                </button>
            </p>
        </div>
    </div>
</template>

<style scoped>
    .sidebar {
        position: sticky;
        top: 1rem;
    }

    #user-profile {
        margin-bottom: 1rem;
    }

    .post-length-counter {
        position: relative;
        top: 0.5rem;
    }

    .page-title {
        margin-bottom: 1rem;
    }
</style>