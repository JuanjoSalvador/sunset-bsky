<script setup lang="ts">
import { useRichText } from '~/composables/useRichText'

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

const { htmlText } = useRichText(props.text, props.agent)
</script>

<template>
  <div v-if="htmlText" v-html="htmlText" class="postText" />
</template>

<style scoped>
div.postText {
  margin-left: 4rem;
  white-space: pre-wrap;
}

div.postText > p + p {
  margin-top: 1rem;
}
</style>