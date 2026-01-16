<script setup lang="ts">
const props = defineProps({
    post: Object,
    reply: Object
})

const replyTo = props.reply?.parent?.author
const postAuthor = props.post?.post?.author

const isReply = ref(Boolean(props.reply))
const isThread = isReply && (props.reply?.parent?.author?.did == postAuthor?.did)

if (isThread) {
    isReply.value = false
}
</script>

<template>
    <div class="is-reply" v-if="reply">
        <div v-if="isReply" class="reason">
            <font-awesome :icon="['fas', 'reply']" />
            Reply to <a :href="'profile/' + replyTo?.handle">{{ replyTo?.displayName }}</a>.
        </div>
    </div>
</template>

<style scoped>
div.reason {
  margin-left: 4.25rem;
  color: rgb(116, 116, 116);
}

.post-icon {
    margin-right: 0.25rem;
    font-size: small;
}
</style>