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
  <div class="container" data-theme="dark">
    <section class="section" v-if="isLoggedIn">
      <div class="columns  is-flex is-centered is-vcentere">
        <div class="column is-one-fifth">
          <SidebarTools />
        </div>
        <div class="column is-three-fifths">
          <RouterView />
        </div>
        <div class="column is-one-fifth">
          <SidebarMenu />
        </div>
      </div>
    </section>
    <div v-else>
      <Login v-if="!isLoggedIn" @login-success="onLoginSuccess" />
    </div>
  </div>
</template>
