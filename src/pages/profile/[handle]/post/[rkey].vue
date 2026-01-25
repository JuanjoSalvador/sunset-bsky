<script setup lang="ts">
const route = useRoute()
const nuxtApp = useNuxtApp()
const bskyAgent = nuxtApp.$agent

const userDid = await bskyAgent.getProfile({"actor": route.params.handle as string})
const uri = `at://${userDid.data.did}/app.bsky.feed.post/${route.params.rkey}`
const currentPost = ref()
const replies = ref()
const parent = ref()

await bskyAgent.getPostThread({
    "uri": uri
}).then(
    (response) => {
        parent.value = response.data.thread.parent
        currentPost.value = response.data.thread.post
        replies.value = response.data.thread.replies
    }
)

const likeUri = ref(currentPost?.viewer?.like)
const repostUri = ref(currentPost?.viewer?.repost)
const maxColumns = currentPost.value.embed?.images.length

function handleLikeToggled(newLikeUri: string | null) {
  likeUri.value = newLikeUri
}

function handleRepostToggled(newRepostUri: string | null) {
  repostUri.value = newRepostUri
}

</script>

<template>
    <div class="parent" v-if="parent">
        <PostHeader :author="parent?.post?.author"  :post="parent" />
        <PostText :text="parent?.post.record.text" :agent="bskyAgent" />
        <div v-if="parent?.post.embed?.images">
            <figure class="image" :class="{ 'is-multi-picture': maxColumns > 1 }" :style="{ '--max-columns': maxColumns }">
                <img  v-for="(image, index) in parent?.post.embed?.images" :key="image.thumb" :src="image.thumb" :alt="image.alt">
            </figure>
        </div>
    
        <PostActions
            :post="parent"
            :post-cid="parent?.post?.cid"
            :post-uri="parent?.post?.uri"
            :like-uri="likeUri"
            :repost-uri="repostUri"
            :agent="bskyAgent"
            @likeToggled="handleLikeToggled"
            @repostToggled="handleRepostToggled"
        />
        <hr />
    </div>
    <div class="post">
        <PostHeader :author="currentPost?.author"  :post="post" />
        <PostText :text="currentPost?.record.text" :agent="bskyAgent" />
        <div v-if="currentPost?.embed?.images">
            <figure class="image" :class="{ 'is-multi-picture': maxColumns > 1 }" :style="{ '--max-columns': maxColumns }">
                <img  v-for="(image, index) in currentPost?.embed?.images" :key="image.thumb" :src="image.thumb" :alt="image.alt">
            </figure>
        </div>
    
        <PostActions
            :post="currentPost"
            :post-cid="currentPost?.post?.cid"
            :post-uri="currentPost?.post?.uri"
            :like-uri="likeUri"
            :repost-uri="repostUri"
            :agent="bskyAgent"
            @likeToggled="handleLikeToggled"
            @repostToggled="handleRepostToggled"
        />
        <hr />
    </div>

    <div v-if="replies.length > 0">
        <h3 class="title is-4">Replies to this post</h3>
        <Post v-for="post in replies" :key="post.post.record.cid" :post="post" :agent="bskyAgent" />
    </div>
</template>

<style scoped>
    .image {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(max(200px, 100% / var(--max-columns) - 20px), 1fr));
        gap: 0.5rem; /* Espacio entre imágenes */
        padding: 0.5rem;
    }

    .image img {
        width: 100%;
        height: auto; /* O 'auto' si quieres mantener proporción */
        object-fit: cover; /* Evita que la imagen se deforme */
        border-radius: 8px;
        display: block;
    }

    .is-multi-picture img {
        aspect-ratio: 1/1 !important;
    }

    .parent {
        font-size: small;
    }

    .post {
        font-size: larger;
    }
</style>