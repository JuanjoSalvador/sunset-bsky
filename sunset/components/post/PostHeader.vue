<script setup lang="ts">
defineProps({
  author: Object,
  timestamp: String,
  post: Object,
})
</script>

<template>
  <div class="media">
    <div class="media-left">
      <figure class="image is-48x48 ">
        <img :src="author?.avatar" class="is-rounded" />
      </figure>
    </div>
    <div class="media-content">
      <p class="title is-4">
        <span v-if="author?.displayName">
          {{ author?.displayName }}
        </span>
        <span v-else="author?.displayName">
          {{ author?.handle }}
        </span>
       
      </p>
      <p class="subtitle is-6">
        @{{ author?.handle }}
      </p>
    </div>
  </div>
</template>