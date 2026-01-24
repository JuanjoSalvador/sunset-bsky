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

onMounted(() => {
  if (!isLoggedIn.value)
    console.log("Not logged in")
})

function onLoginSuccess() {
  isLoggedIn.value = true
}

function onLogoutSuccess() {
  sessionStore.clearSession()
  isLoggedIn.value = false
}
</script>

<template>
  <div class="container">
    <div v-if="!isLoggedIn">
      <Login @login-success="onLoginSuccess" />
    </div>

    <section class="section" v-else>
      <div class="columns is-4">
        <div class="column is-one-quarter">
          <SidebarTools />
        </div>
        <div class="column is-two-quarters">
          <NuxtPage />
        </div>
        <div class="column is-one-quarter">
          <SidebarMenu @logout-success="onLogoutSuccess" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&family=Open+Sans:ital,wght@0,300;1,300&display=swap');
.is-fixed {
  position: fixed;
}
</style>
