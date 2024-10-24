<script setup lang="ts">
const props = defineProps({
    value: Object
})

const nuxtApp = useNuxtApp()
const bskyAgent = nuxtApp.$bskyAgent
const currentPost = ref()

if (props.value?.reason == 'like' || props.value?.reason == 'repost') {
    const currentPostUri = computed(() => props.value?.reasonSubject)
    currentPost.value = await bskyAgent.getPosts({
        "uris": [currentPostUri.value]
    })
}
</script>

<template>
    <div v-if="value?.reason == 'follow'">
        <div class="media">
            <div class="media-left">
                <figure class="image is-32x32 ">
                    <img :src="value?.author?.avatar" class="is-rounded" />
                </figure>
            </div>
            <div class="media-content">
                <p class="subtitle is-6">
                    <strong>
                        <span v-if="value?.author?.displayName">
                            <a :href="'profile/' + value?.author?.handle">{{ value?.author?.displayName }}</a>
                        </span>
                        <span v-else>
                            <a :href="'profile/' + value?.author?.handle">{{ value?.author?.handle }}</a>
                        </span>
                        is following you!
                    </strong>
                </p>
            </div>
        </div>
        <hr/>
    </div>
    <div v-if="value?.reason == 'like'">
        <div class="media">
            <div class="media-left">
                <figure class="image is-32x32 ">
                    <img :src="value?.author?.avatar" class="is-rounded" />
                </figure>
            </div>
            <div class="media-content">
                <p class="subtitle is-6">
                    <strong>
                        <span v-if="value?.author?.displayName">
                            <a :href="'profile/' + value?.author?.handle">{{ value?.author?.displayName }}</a>
                        </span>
                        <span v-else>
                            <a :href="'profile/' + value?.author?.handle">{{ value?.author?.handle }}</a>
                        </span>
                        liked your post!
                    </strong>
                </p>
                <div class="notification-post">
                    {{ currentPost.data.posts[0].record.text }}
                </div>
            </div>
        </div>
        <hr/>
    </div>
    <div v-if="value?.reason == 'repost'">
        <div class="media">
            <div class="media-left">
                <figure class="image is-32x32 ">
                    <img :src="value?.author?.avatar" class="is-rounded" />
                </figure>
            </div>
            <div class="media-content">
                <p class="subtitle is-6">
                    <strong>
                        <span v-if="value?.author?.displayName">
                            <a :href="'profile/' + value?.author?.handle">{{ value?.author?.displayName }}</a>
                        </span>
                        <span v-else>
                            <a :href="'profile/' + value?.author?.handle">{{ value?.author?.handle }}</a>
                        </span>
                        reposted your post!
                    </strong>
                </p>
                <div class="notification-post">
                    {{ currentPost.data.posts[0].record.text }}
                </div>
            </div>
        </div>
        <hr/>
    </div>
    <div v-if="value?.reason == 'reply'">
        <PostHeader :author="value?.author"  :post="value" :timestamp="value?.record.createdAt" />
        <PostReply :post="value" :reply="value?.record?.reply" />
        <PostText :text="value?.record?.text" :agent="bskyAgent" />

        <div v-if="value?.embed?.images" align="center">
            <figure v-for="image in value?.embed?.images" :key="image.thumb" class="image">
                <a :href="image.thumb">
                    <img :src="image.thumb" :alt="image.alt">
                </a>
            </figure>
            <br />
        </div>
        
        <br />

        <PostActions
            :post="value"
            :post-cid="value?.cid"
            :post-uri="value?.uri"
            :like-uri="likeUri"
            :repost-uri="repostUri"
            :agent="bskyAgent"
            @likeToggled="handleLikeToggled"
            @repostToggled="handleRepostToggled"
        />
        <hr/>
    </div>
</template>

<style scoped>
div.notification-post {
    margin-left: 0.25rem;
    background-color: rgb(243, 243, 243);
    padding: 1.25rem;;
}
</style>