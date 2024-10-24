<script setup lang="ts">
import { useSessionStore } from '~/stores/session'
import { useRichText } from '~/composables/useRichText'

const nuxtApp = useNuxtApp()
const bskyAgent = nuxtApp.$bskyAgent
const sessionStore = useSessionStore()
const route = useRoute()

const loading = ref(false)
const cursor = ref<string | null>(null)
const endReached = ref(false)
const observer = ref<IntersectionObserver | null>(null)
const userProfile = ref()
const timelineData = ref<Array<any>>([])

const savedSessionData = sessionStore.getSession()
const userHandle = route.params.handle as string

async function resumeSession() {
  if (savedSessionData)
    await bskyAgent.resumeSession(savedSessionData)
}

async function fetchProfile() {
    userProfile.value = await bskyAgent.getProfile({actor: userHandle})

    console.log(userProfile.value)
}

async function fetchData(cursorValue?: string | null) {
  try {
    loading.value = true

    console.log("Updating data from Bsky")

    const response = cursorValue === null
      ? await bskyAgent.getAuthorFeed({ actor: userHandle, limit: 50 })
      : await bskyAgent.getAuthorFeed({ actor: userHandle, cursor: cursorValue, limit: 50 })

    // Skip replies and reposts from current user
    const filteredPosts = response.data.feed.filter(
      post => !(post.post.record as any).reply
    )

    timelineData.value = [...timelineData.value, ...filteredPosts]

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
    fetchProfile()
    fetchData()
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
    
        <span style="white-space: pre-wrap;"> 
            {{ userProfile?.data?.description }}
        </span>
        
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
    <ul>
        <Post v-for="post in timelineData" :key="post.post.record.cid" :post="post" :agent="bskyAgent" />
    </ul>
    <div id="endOfList" />
</template>

<style scoped>
figure.user-avatar {
    margin-bottom: 1rem;
}

#user-profile {
    position: relative;
    top: -3rem;
}

#user-profile figure {
    margin-left: 1rem;
}

#user-profile figure img {
    border: 0.2rem solid white;
    border-radius: 10%;
}
</style>