<script setup lang="ts">
import PostText from './PostText.vue';
import PostHeader from './PostHeader.vue';
import PostActions from './PostActions.vue';
import PostReply from './PostReply.vue';
import PostReason from './PostReason.vue';

const props = defineProps({
    post: Object,
    agent: Object
})

const nuxtApp = useNuxtApp()
const bskyAgent = nuxtApp.$bskyAgent
const currentPost = computed(() => props.post?.post)

const likeUri = ref(props.post?.post?.viewer?.like)
const repostUri = ref(props.post?.post?.viewer?.repost)

function handleLikeToggled(newLikeUri: string | null) {
  likeUri.value = newLikeUri
}

function handleRepostToggled(newRepostUri: string | null) {
  repostUri.value = newRepostUri
}
</script>

<template>
    <div>
        <PostReason :reason="post?.reason" />
        <PostHeader :author="currentPost?.author"  :post="post" :timestamp="currentPost?.record.createdAt" />
        <PostReply :post="post" :reply="post?.reply" v-if="post?.reply"/>
        <PostText :text="currentPost?.record?.text" :agent="bskyAgent" />

        <br />

        <div v-if="currentPost?.embed?.images" align="center">
            <figure v-for="image in currentPost?.embed?.images" :key="image.thumb" class="image">
                <a :href="image.thumb">
                    <img :src="image.thumb" :alt="image.alt">
                </a>
            </figure>
        </div>

        <PostActions
            :post="currentPost"
            :post-cid="currentPost?.cid"
            :post-uri="currentPost?.uri"
            :like-uri="likeUri"
            :repost-uri="repostUri"
            :agent="bskyAgent"
            @likeToggled="handleLikeToggled"
            @repostToggled="handleRepostToggled"
            />

        <hr />
    </div>
</template>

<style scoped>
.image img {
    width: auto;
    height: auto;
    max-width: 80%;
    max-height: 50%;
    margin-left: 4rem;
    border-radius: 1rem;
    padding: 0.2rem;
    border: 0.1rem solid rgb(238, 215, 182);
}

</style>