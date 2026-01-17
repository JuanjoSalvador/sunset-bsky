<script setup lang="ts">
const props = defineProps({
  author: Object,
  timestamp: String,
  post: Object,
})
const isRepost : boolean = Boolean(props.post?.reason?.["$type"] === 'app.bsky.feed.defs#reasonRepost');
</script>

<template>
  <div class="reason-container">
    <div v-if="isRepost">
        <font-awesome :icon="['fas', 'repeat']" class="post-icon" />
        Reposted by <NuxtLink :to="{ name: 'profile-handle', params: { handle: post?.reason.by.handle } }">{{ post?.reason.by.displayName }}</NuxtLink>
    </div>
  </div>

  <div class="media">
    <div class="media-left">
      <figure class="image is-48x48 ">
        <img :src="author?.avatar" class="is-rounded" />
      </figure>
    </div>
    <div class="media-content">
      <span class="subtitle is-5">
        <span v-if="author?.displayName">
          <NuxtLink :to="{ name: 'profile-handle', params: { handle: author.handle } }">
            {{ author?.displayName }}
          </NuxtLink>
        </span>
        <span v-else>
          <NuxtLink :to="{ name: 'profile-handle', params: { handle: author?.handle } }">
            {{ author?.handle }}
          </NuxtLink>
        </span>
        <p class="small">
            @{{ author?.handle }}
        </p>
      </span>
    </div>
    <!-- <div class="media-right">
      <a :href="postUri">{{ timestamp }}</a>
    </div> -->
  </div>

  <PostReply :post="post" />
</template>

<style scoped>
div.reason-container {
  margin-bottom: 0.5rem;
  margin-left: 4rem;
  font-size: small;
}

div.reason a {
  font-weight: bold;
  color: default;
}

.post-icon {
    margin-right: 0.3rem;
    font-size: small;
    color: rgb(3, 134, 69);
}

span.handle {
  margin-left: 0.25rem;
}

.media {
  margin: 0px !important;
}

p.small {
  font-size: small;
}
</style>