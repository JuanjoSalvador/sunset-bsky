<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  agent: {
    type: Object as () => any,
  },
  reply: {
    type: Object,
  },
})

const { segments } = useRichText(props.text, props.agent)
</script>

<template>
  <div class="post-content">
    <template v-for="(segment, index) in segments" :key="index">
      <NuxtLink 
        v-if="segment.isMention()" 
        :to="{ name: 'profile-handle', params: { handle: segment.mention?.did } }"
      >
        {{ segment.text }}
      </NuxtLink>

      <NuxtLink 
        v-else-if="segment.isTag()" 
        :to="`/hashtag/${segment.tag?.tag}`"
      >
        {{ segment.text }}
      </NuxtLink>

      <a 
        v-else-if="segment.isLink()" 
        :href="segment.link?.uri" 
        target="_blank" 
      >
        {{ segment.text }}
      </a>

      <span v-else>{{ segment.text }}</span>
    </template>
  </div>
</template>

<style scoped>
div.post-content {
  margin-left: 4rem;
  margin-bottom: 0.5rem;
  white-space: pre-wrap;
}

div.post-content > p + p {
  margin-top: 0.5rem;
}
</style>