<script setup lang="ts">
import { useSessionStore } from '~/stores/session'

const nuxtApp = useNuxtApp()
const bskyAgent = nuxtApp.$bskyAgent
const sessionStore = useSessionStore()

const currentUserDid = sessionStore.getSession().did
const currentUser = await bskyAgent.getProfile({'actor': currentUserDid})
</script>

<template>
    <div class="sidebar">
        <NuxtLink to="" class="media" id="user-profile">
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

        <textarea class="textarea" placeholder="What's up?"></textarea>
        <br/>
        <button class="button">
            Post
        </button>
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