<script setup lang="ts">
import PostText from './PostText.vue';
import PostHeader from './PostHeader.vue';
import PostActions from './PostActions.vue';

const props = defineProps({
    post: Object,
    agent: Object
})

const router = useRouter()

const currentPost = computed(() => props.post?.post)

const likeUri = ref(props.post?.post?.viewer?.like)
const repostUri = ref(props.post?.post?.viewer?.repost)
const maxColumns = currentPost.value.embed?.images?.length

function handleLikeToggled(newLikeUri: string | null) {
  likeUri.value = newLikeUri
}

function handleRepostToggled(newRepostUri: string | null) {
  repostUri.value = newRepostUri
}

function openPost() {
    if (!currentPost) return

    const rkey = currentPost.value.uri.split("/")[4]

    router.push({
        name: 'profile-handle-post-rkey', // Nuxt genera este nombre automáticamente
        params: { 
            handle: currentPost.value?.author?.handle, 
            rkey: rkey 
        }
    })
}
</script>

<template>
    <div class="post" @click="openPost()">
        <PostHeader :author="currentPost?.author"  :post="post" :timestamp="currentPost?.record.createdAt" />
        <PostText :text="currentPost?.record?.text" :agent="agent" />

        <div v-if="currentPost?.embed?.images">
            <figure class="image" :class="{ 'is-multi-picture': maxColumns > 1 }" :style="{ '--max-columns': maxColumns }">
                <img  v-for="(image, index) in currentPost?.embed?.images" :key="image.thumb" :src="image.thumb" :alt="image.alt" class="post-picture">
            </figure>
        </div>

        <PostActions
            :post="currentPost"
            :post-cid="currentPost?.cid"
            :post-uri="currentPost?.uri"
            :like-uri="likeUri"
            :repost-uri="repostUri"
            :agent="agent"
            @likeToggled="handleLikeToggled"
            @repostToggled="handleRepostToggled"
        />
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

    .post {
        padding-top: 0.5rem;
        padding-right: 0.5rem;
        padding-bottom: 0.5rem;
        /* border-top: 0.1rem solid #444;
        border-left: 0.1rem solid #444;
        border-right: 0.1rem solid #444; */
    }

    .post:hover {
        background-color: rgb(44, 51, 58);
    }
</style>