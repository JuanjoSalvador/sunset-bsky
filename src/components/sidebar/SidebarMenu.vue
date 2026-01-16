<script setup lang="ts">
const emit = defineEmits(['logoutSuccess'])
const nuxtApp = useNuxtApp()
const bskyAgent = nuxtApp.$agent

async function logout() {
  try {
    await bskyAgent.logout()
    emit('logoutSuccess')
  }
  catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>

<template>
    <div class="sidebar">
        <ul>
            <li>
                <NuxtLink to="/" class="button" activeClass="active">
                    <span class="icon is-small">
                        <font-awesome :icon="['fas', 'house']" class="list-icon" /> 
                    </span>
                    <span>Home</span>
                </NuxtLink>
            </li>
            <li> 
                <NuxtLink to="/notifications" class="button" activeClass="active">
                    <span class="icon is-small">
                        <font-awesome :icon="['fas', 'bell']" class="list-icon" />
                    </span>
                    <span>Notifications</span>
                </NuxtLink>
            </li>
            <li>
                <button @click="logout" class="button">
                    <span class="icon is-small">
                        <font-awesome :icon="['fas', 'right-from-bracket']"  class="list-icon" />
                    </span>
                    <span>Logout</span>
                </button>
            </li>
        </ul>
        <hr />
        <h3 class="subtitle is-4">
            Sunset
        </h3>
        <p>
            An experimental Bluesky client, made by 
            <NuxtLink :to="{ name: 'profile-handle', params: { handle: 'jsalvador.me' } }">
                Juanjo Salvador
            </NuxtLink>
        </p>
        <br/>
        <ul class="social-links">
            <li>
                <a href="https://github.com/JuanjoSalvador/sunset-bsky/">
                     <span class="icon is-small">
                        <font-awesome :icon="['fab', 'github']"  class="list-icon" />
                    </span>
                    <span class="social-link-button">Github</span>
                </a> 
            </li>
            <li>
                <NuxtLink :to="{ 
                    name: 'profile-handle', 
                    params: { handle: 'sunset-bsky.bsky.social' } 
                }">
                     <span class="icon is-small">
                        <font-awesome :icon="['fab', 'bluesky']"  class="list-icon" />
                    </span>
                    <span class="social-link-button">Bluesky</span>
                </NuxtLink>
            </li>
        </ul>
        <Announcement />
    </div>
</template>

<style scoped>
.list-icon {
  margin-right: 0em;
}
.sidebar {
    position: sticky;
    top: 1rem;
}
.button {
  border: none !important;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}
.social-links li {
    margin-right: 0.5em;
    float: right;
}
.social-link-button {
    position: relative;
    margin-left: 0.5em;
    top: -0.1em;
}

</style>