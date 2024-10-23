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
    <div class="">
        <div v-if="isReply" class="reason">
            <font-awesome :icon="['fas', 'reply']" />
            Reply to {{ replyTo?.displayName }}
        </div>
    </div>
</template>

<style scoped>
div.reason {
  margin-left: 4.25rem;
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
}

.post-icon {
    margin-right: 0.3rem;
    font-size: small;
}
</style>