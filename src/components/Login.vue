<script setup lang="ts">
const emit = defineEmits(['loginSuccess'])
const nuxtApp = useNuxtApp()
const bskyAgent = nuxtApp.$agent

const identifier = ref('')
const password = ref('')
const loginError = ref(false)
const errorMessage = ref('')

async function login() {
  try {
    await bskyAgent.login({ identifier: identifier.value, password: password.value })
    emit('loginSuccess') // Emitting the success event
  }
  catch (error : any) {
    loginError.value = true
    errorMessage.value = error.message
  }
}
</script>

<template>
  <section class="section is-vcentered">
    <div class="columns is-flex is-centered">
      <div class="column is-one-third has-text-centered">
        <figure>
          <img src="/sunset-logo.png" alt="Sunset Logo" width="200" height="200" />
        </figure>
        <br />
        <h1 class="title is-1">
          Sunset
        </h1>
        <h2 class="subtitle">
          Yet Another Bluesky Client.
        </h2>
        <div class="field">
          <div class="control">
            <input v-model="identifier" placeholder="Email or username" class="input" v-bind:class="loginError ? 'is-danger' : ''">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input v-model="password" type="password" placeholder="Password" class="input" v-bind:class="loginError ? 'is-danger' : ''">
          </div>
          <p class="help is-danger">{{ errorMessage}}</p>
        </div>
        <div class="field is-grouped is-grouped-centered">
          <p class="control">
            <button class="button is-primary" @click="login">
              <strong>Login</strong>
            </button>
          </p>
        </div>
        <br />
        <Announcement />
      </div>
    </div>
  </section>
  <section class="section has-text-centered is-size-7">
    <span>
      Created and maintained by <a href="https://bsky.app" target="_blank" rel="noopener noreferrer">Juanjo Salvador</a>. Not affiliated with Bluesky Social.
    </span>
    <p>
      Don't have an account? Sign up at
      <a href="https://bsky.app" target="_blank" rel="noopener noreferrer">bsky.app</a>
    </p>
  </section>
</template>

<style scoped>
.columns.is-vcentered {
  align-items: center;
  -webkit-box-align: center;
     -ms-flex-align: center;
}

</style>