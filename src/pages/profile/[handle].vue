<script setup lang="ts">
import { useSessionStore } from '~/stores/session'
import { useRichText } from '~/composables/useRichText'

const nuxtApp = useNuxtApp()
const bskyAgent = nuxtApp.$agent
const sessionStore = useSessionStore()
const route = useRoute()

const userProfile = ref()
const bioText = computed(() => userProfile.value?.data?.description || '')
const { segments } = useRichText(bioText, bskyAgent)

const savedSessionData = sessionStore.getSession()
const userHandle = route.params.handle as string
const followLabel = ref()
const pinnedPost = ref()

followLabel.value = "Follow"

async function resumeSession() {
  if (savedSessionData)
    await bskyAgent.resumeSession(savedSessionData)
}

async function fetchProfile() {
    userProfile.value = await bskyAgent.getProfile({ actor: userHandle })
}

function toggleFollowingUser() {
    if (followLabel.value == "Follow") {
        followLabel.value = "Unfollow"
    } else {
        followLabel.value = "Follow"
    }
}

onBeforeMount(() => {
    resumeSession()
    fetchProfile()
})
</script>

<template>
    <div id="banner">
        <img :src=userProfile?.data?.banner />
    </div>
    <div id="user-profile">
        <figure class="image is-96x96 user-avatar">
            <img :src="userProfile?.data?.avatar" />
        </figure>
        <div class="columns">
            <div class="column">
                <p class="title is-4">
                    <span>
                        {{ userProfile?.data?.displayName }}
                    </span>
                
                </p>
                <p class="subtitle is-6">
                    <span>
                        @{{ userProfile?.data?.handle }}
                    </span>
                </p>
            </div>
            <div class="column">
                <div class="field is-grouped is-grouped-right">
                    <button class="button">
                        <font-awesome :icon="['fas', 'share-nodes']" />
                    </button>
                    <button 
                        class="button" 
                        :class="{ 'is-danger': followLabel == 'Unfollow' }" 
                        @click="toggleFollowingUser()"
                        v-if="userProfile?.data?.handle != 'jsalvador.me'"
                    >
                        {{ followLabel }}
                    </button>
                    <button class="button" v-if="userProfile?.data?.handle == 'jsalvador.me'">
                        Edit profile
                    </button>
                </div>
            </div>
        </div>

        <div class="bio-container mb-4" style="white-space: pre-wrap;">
            <template v-for="(segment, i) in segments" :key="i">
                <NuxtLink v-if="segment.isMention()" :to="`/profile/${segment.mention?.did}`">
                    {{ segment.text }}
                </NuxtLink>

                <NuxtLink v-else-if="segment.isTag()" :to="`/hashtag/${segment.tag?.tag}`">
                    {{ segment.text }}
                </NuxtLink>

                <a v-else-if="segment.isLink()" :href="segment.link?.uri" target="_blank" rel="nofollow">
                    {{ segment.text }}
                </a>

                <span v-else>{{ segment.text }}</span>
            </template>
        </div>
        
        <hr/>

        <div class="columns">
            <div class="column">
                <div class="level">
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Following</p>
                            <p class="subtitle">
                                {{ userProfile?.data?.followsCount }}
                            </p>
                        </div>
                    </div>

                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Followers</p>
                            <p class="subtitle">
                                {{ userProfile?.data?.followersCount }}
                            </p>
                        </div>
                    </div>

                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">Posts</p>
                            <p class="subtitle">
                                {{ userProfile?.data?.postsCount }}
                            </p>
                        </div>
                    </div>                        
                </div>
            </div>
        </div>
    </div>
    
    <NuxtPage />

    <div id="endOfList" />
</template>

<style scoped>
figure.user-avatar {
    margin-bottom: 1rem;
}

#user-profile {
    position: relative;
    top: -3rem;
    margin-left: 1rem;
}

#user-profile figure img {
    border: 0.2rem solid white;
    border-radius: 10%;
}
</style>