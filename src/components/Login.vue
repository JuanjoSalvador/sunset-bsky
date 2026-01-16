<script setup lang="ts">
const emit = defineEmits(['loginSuccess'])
const nuxtApp = useNuxtApp()
const bskyAgent = nuxtApp.$agent

const identifier = ref('')
const password = ref('')
const loginError = ref(false)

async function login() {
  try {
    const result = await bskyAgent.login({ identifier: identifier.value, password: password.value })
    emit('loginSuccess') // Emitting the success event
  }
  catch (error) {
    console.error('Login failed:', error)
    loginError.value = true
  }
}
</script>

<template>
  <section class="section is-vcentered">
    <div class="columns is-flex is-centered">
      <div class="column is-one-third has-text-centered">
        <Announcement />
        <br />
        <h1 class="title is-1">
          Sunset
        </h1>
        <h2 class="subtitle">
          Yet Another Bluesky Client.
        </h2>
        <div class="field">
          <div class="control">
            <input v-model="identifier" placeholder="Email or username" class="input">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input v-model="password" type="password" placeholder="Password" class="input">
          </div>
        </div>
        <div class="field is-grouped is-grouped-centered">
          <p class="control">
            <button class="button is-primary" @click="login">
              <strong>Login</strong>
            </button>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.columns.is-vcentered {
  align-items: center;
  -webkit-box-align: center;
     -ms-flex-align: center;
}
</style>