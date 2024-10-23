// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['bulma/css/bulma.min.css'],
  modules: [
    '@pinia/nuxt',
    '@vesp/nuxt-fontawesome'
  ],
  plugins: [
    { src: '~/plugins/bsky-agent.ts', mode: 'client' },
  ],
  fontawesome: {
    icons: {
      solid: ['repeat', 'heart', 'bell', 'right-from-bracket', 'house', 'reply', 'book-open'],
      regular: ['comment', 'heart']
    }
  },
  srcDir: 'src',
})