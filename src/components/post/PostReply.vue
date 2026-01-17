<script setup lang="ts">
const props = defineProps({
    post: Object,
})

const nuxtApp = useNuxtApp()
const bskyAgent = nuxtApp.$agent
const replyTo = ref()

let authorDid = props.post?.reasonSubject?.split('/')[2] || props.post?.reply?.parent?.author?.did;

if (authorDid) {
    await bskyAgent.getProfile({ actor: authorDid }).then((profile) => {
        replyTo.value = {
            handle: profile.data.handle,
            displayName: profile.data.displayName || profile.data.handle
        }
    }).catch((error) => {
        console.log("Error fetching profile:", error)
        replyTo.value = null; // Limpiamos en caso de error
    })
}

// const isReply = ref(Boolean(props.replyTo))
// const isThread = isReply && (props.replyTo?.parent?.author?.did == postAuthor?.did)

// if (isThread) {
//     isReply.value = false
// }
console.log("replyTo:", replyTo)
</script>

<template>
    <div class="is-reply reason" v-if="replyTo?.handle">
        <font-awesome :icon="['fas', 'reply']" />
        Reply to <NuxtLink :to="{ name: 'profile-handle', params: { handle: replyTo?.handle } }">{{ replyTo?.displayName }}</NuxtLink>.
    </div>
</template>

<style scoped>
div.reason {
  margin-left: 4.25rem;
  color: rgb(116, 116, 116);
  font-size: small;
  margin-bottom: 0.5rem;
}

.post-icon {
    margin-right: 0.25rem;
    font-size: x-small;
}

.hidden {
    display: none;
}
</style>