<script setup lang="ts">
import UserProfileLink from './UserProfileLink.vue';
</script>

<template>
    <div class="sidebar">
        <UserProfileLink />

        <textarea class="textarea" placeholder="What's up?"></textarea>
        <br/>
        <button class="button">
            Post
        </button>
    </div>
</template>

<style scoped>
.sidebar {
    position: fixed;
}
</style>