<script setup lang="ts">
</script>

<template>
    <NuxtLink to="" class="media" id="user-profile">
        <div class="media-left">
            <figure class="image is-48x48 ">
                <img src="https://placehold.co/48x48" />
            </figure>
        </div>
        <div class="media-content">
            <p class="title is-4">
                <span>
                Username
                </span>
            
            </p>
            <p class="subtitle is-6">
                @username
            </p>
        </div>
  </NuxtLink>
</template>

<style>
#user-profile {
    margin-bottom: 1rem;
}
</style>