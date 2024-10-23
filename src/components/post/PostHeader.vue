<script setup lang="ts">
const props = defineProps({
  author: Object,
  timestamp: String,
  post: Object,
})

const postId = props.post?.post?.uri.split('/').at(-1)
const postUri = 'https://bsky.app/profile/' + props.author?.handle + '/post/' + postId
</script>

<template>
  <div class="media">
    <div class="media-left">
      <figure class="image is-48x48 ">
        <img :src="author?.avatar" class="is-rounded" />
      </figure>
    </div>
    <div class="media-content">
      <span class="subtitle is-4">
        <span v-if="author?.displayName">
          <a :href="'profile/' + author?.handle">{{ author?.displayName }}</a>
        </span>
        <span v-else>
          <a :href="'profile/' + author?.handle">{{ author?.handle }}</a>
        </span>
      </span>
      <span class="subtitle is-6 handle">@{{ author?.handle }}</span>    
    </div>
    <div class="media-right">
      <a :href="postUri">{{ timestamp }}</a>
    </div>
  </div>
</template>

<style scoped>
span.handle {
  margin-left: 0.25rem;
}
</style>