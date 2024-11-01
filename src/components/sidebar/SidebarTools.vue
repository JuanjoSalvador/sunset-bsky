<script setup lang="ts">
import type { ComAtprotoRepoCreateRecord } from '@atproto/api'
import { useSessionStore } from '~/stores/session'

const nuxtApp = useNuxtApp()
const bskyAgent = nuxtApp.$agent
const sessionStore = useSessionStore()

const currentUserDid = sessionStore.getSession().did
const currentUser = await bskyAgent.getProfile({'actor': currentUserDid})
const newPost = ref()

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
    } catch (error) {
        console.log(error)
    }

    // Clear
    newPost.value = null
}
</script>

<template>
    <div class="sidebar">
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

        <textarea class="textarea" placeholder="What's up?" v-model="newPost"></textarea>
        <br/>
        <div class="field is-grouped is-grouped-right">
            <p class="control">
                <button class="button" @click="post">
                    Post
                </button>
            </p>
        </div>
    </div>
</template>

<style scoped>
.sidebar {
    position: fixed;
}

#user-profile {
    margin-bottom: 1rem;
}
</style>