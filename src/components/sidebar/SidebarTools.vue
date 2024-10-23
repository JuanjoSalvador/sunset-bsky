<script setup lang="ts">
import SidebarUserProfile from './SidebarUserProfile.vue';
</script>

<template>
    <div class="sidebar">
        <SidebarUserProfile />

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
    top: 4.75rem;
}
</style>