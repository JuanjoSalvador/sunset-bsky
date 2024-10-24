<script setup lang="ts">
import { useSessionStore } from '@/stores/session'

const isLoggedIn = ref(false)
const isLoading = ref(true)
const sessionStore = useSessionStore()

onMounted(() => {
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
</script>

<template>
  <div class="container">
    <section class="section" v-if="isLoggedIn">
      <div class="columns is-3">
        <div class="column">
          <SidebarTools />
        </div>
        <div class="column is-half">
          <NuxtPage />
        </div>
        <div class="column">
          <SidebarMenu />
        </div>
      </div>
    </section>
    <div v-else>
      <Login v-if="!isLoggedIn" @login-success="onLoginSuccess" />
    </div>
  </div>
</template>
