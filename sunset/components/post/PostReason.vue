<script setup lang="ts">
defineProps({
  reason: Object,
})
</script>

<template>
    <div class="">
        <div v-if="reason" class="reason">
            <font-awesome :icon="['fas', 'repeat']" class="post-icon" />
            Reposted by <a :href="reason.by.handle">{{ reason.by.displayName }}</a>
        </div>
    </div>
</template>

<style scoped>
div.reason {
  margin-left: 2.65rem;
  margin-bottom: 0.25rem;
}

.post-icon {
    margin-right: 0.3rem;
    font-size: small;
}
</style>