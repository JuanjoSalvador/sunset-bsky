<script setup lang="ts">
const emit = defineEmits(['loginSuccess'])
const nuxtApp = useNuxtApp()
const bskyAgent = nuxtApp.$bskyAgent

const identifier = ref('')
const password = ref('')
const loginError = ref(false)

async function logout() {
  try {
    await bskyAgent.logout()
  }
  catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>

<template>
  <!-- <section class="section">
    <div class="columns is-flex is-centered is-vcentered">
      <div class="column is-one-third">
        <div class="field">
          <div class="control">
            <input v-model="identifier" placeholder="Email" class="input">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input v-model="password" type="password" placeholder="Password" class="input">
          </div>
        </div>

        <div class="field is-grouped is-grouped-centered">
          <p class="control">
            <button class="button is-primary" @click="logout">
              <strong>Login</strong>
            </button>
          </p>
        </div>
      </div>
    </div>
  </section> -->
</template>

<style scoped>
</style>