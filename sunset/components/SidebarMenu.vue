<script lang="ts">
import { NuxtLink } from '#build/components';
import { useSessionStore } from '~/stores/session'
</script>

<template>
    <div class="sidebar">
        <h2 class="subtitle is-2">
            Sunset
        </h2>
        <h3 class="subtitle">
            An experimental Bluesky client.
        </h3>
        <ul>
            <li>
                <NuxtLink to="/" class="button is-text" >
                    <span class="icon is-small">
                        <font-awesome :icon="['fas', 'house']" class="list-icon" /> 
                    </span>
                    <span>Home</span>
                </NuxtLink>
            </li>
            <li> 
                <NuxtLink to="/notifications" class="button is-text">
                    <span class="icon is-small">
                        <font-awesome :icon="['fas', 'bell']" class="list-icon" />
                    </span>
                    <span>Notifications</span>
                </NuxtLink>
            </li>
            <li>
                <button class="button is-text" @click="logout()">
                    <span class="icon is-small">
                        <font-awesome :icon="['fas', 'right-from-bracket']"  class="list-icon" />
                    </span>
                    <span>Logout</span>
                </button>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.list-icon {
  margin-right: 1em;
}
.sidebar {
    position: fixed;
}
</style>