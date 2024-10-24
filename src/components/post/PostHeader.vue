<script setup lang="ts">
const props = defineProps({
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
      <span class="subtitle is-5">
        <span v-if="author?.displayName">
          <NuxtLink :to="{ 
            name: 'profile-handle', 
            params: { handle: author?.handle } 
          }">
            {{ author?.displayName }}
          </NuxtLink>
        </span>
        <span v-else>
          <NuxtLink :to="{ 
            name: 'profile-handle', 
            params: { handle: author?.handle } 
          }">
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
</template>

<style scoped>
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