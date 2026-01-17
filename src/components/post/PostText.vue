<script setup lang="ts">
import { RichText } from '@atproto/api'

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
  margin-top: 0.5rem;
}
</style>