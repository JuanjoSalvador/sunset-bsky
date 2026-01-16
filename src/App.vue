<script setup lang="ts">
import { useSessionStore } from '@/stores/session'

const isLoggedIn = ref(false)
const isLoading = ref(true)
const sessionStore = useSessionStore()

onBeforeMount(() => {
  const storedSession = localStorage.getItem('session')
  if (storedSession && storedSession !== 'undefined') {
    try {
      sessionStore.setSession(JSON.parse(storedSession))
      isLoggedIn.value = true
    }
    catch (e) {
      console.error('Error parsing stored session:', e)
    }
  }

  isLoading.value = false
})

function onLoginSuccess() {
  isLoggedIn.value = true
}

function onLogoutSuccess() {
  isLoggedIn.value = false
}
</script>

<template>
  <div class="container">
    <section class="section" v-if="isLoggedIn">
      <div class="columns is-4">
        <div class="column is-one-quarter">
          <SidebarTools />
        </div>
        <div class="column is-two-quarters">
          <NuxtPage />
        </div>
        <div class="column is-one-quarter">
          <SidebarMenu />
        </div>
      </div>
    </section>
    <div v-else>
      <Login v-if="!isLoggedIn" @login-success="onLoginSuccess" />
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&family=Open+Sans:ital,wght@0,300;1,300&display=swap');
</style>
