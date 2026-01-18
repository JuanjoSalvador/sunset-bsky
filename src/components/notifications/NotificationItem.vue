<script setup lang="ts">
const props = defineProps({
    value: Object
})

const nuxtApp = useNuxtApp()
const bskyAgent = nuxtApp.$agent
const currentPost = ref()

const likeUri = ref(props.value?.post?.viewer?.like)
const repostUri = ref(props.value?.post?.viewer?.repost)

function handleLikeToggled(newLikeUri: string | null) {
  likeUri.value = newLikeUri
}

function handleRepostToggled(newRepostUri: string | null) {
  repostUri.value = newRepostUri
}

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
                        <span class="notification-icon follow-icon">
                            <font-awesome :icon="['fas', 'user-plus']" class="text-red" />
                        </span>
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
        <div class="media like-content">
            <div class="media-left">
                <figure class="image is-32x32 ">
                    <img :src="value?.author?.avatar" class="is-rounded" />
                </figure>
            </div>
            <div class="media-content">
                <p class="subtitle is-6">
                    <strong>
                        <span class="notification-icon like-icon">
                            <font-awesome :icon="['fas', 'heart']" class="text-red" />
                        </span>
                        <span v-if="value?.author?.displayName">
                            <a :href="'profile/' + value?.author?.handle">{{ value?.author?.displayName }}</a>
                        </span>
                        <span v-else>
                            <a :href="'profile/' + value?.author?.handle">{{ value?.author?.handle }}</a>
                        </span>
                        liked your post!
                    </strong>
                </p>
                <div class="notification-post has-text-grey">
                    {{ currentPost.data.posts[0]?.record?.text }}
                </div>
            </div>
        </div>
        <hr/>
    </div>
    <div v-if="value?.reason == 'repost'">
        <div class="media repost-content">
            <div class="media-left">
                <figure class="image is-32x32 ">
                    <img :src="value?.author?.avatar" class="is-rounded" />
                </figure>
            </div>
            <div class="media-content">
                <p class="subtitle is-6">
                    <strong>
                        <span class="notification-icon repost-icon">
                            <font-awesome :icon="['fas', 'repeat']" class="text-green" />
                        </span>
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
        <PostText :text="value?.record?.text" :agent="bskyAgent" />

        <div v-if="value?.embed?.images" align="center">
            <figure v-for="image in value?.embed?.images" :key="image.thumb" class="image">
                <a :href="image.thumb">
                    <img :src="image.thumb" :alt="image.alt">
                </a>
            </figure>
        </div>

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
}

.like-content, .repost-content {
    font-size: smaller;
}

.notification-icon {
    margin-right: 0.5em;
    font-size: medium;
}

.like-icon {
    color: brown;
}

.repost-icon {
    color: rgb(3, 134, 69);
}
</style>