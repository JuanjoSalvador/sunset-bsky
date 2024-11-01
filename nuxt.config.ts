// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    keepalive: true
  },
  css: ['bulma/css/bulma.min.css'],
  modules: ['@pinia/nuxt', '@vesp/nuxt-fontawesome', 'nuxt-twemoji', '@nuxtjs/google-fonts'],
  plugins: [
    { src: '~/plugins/bsky-agent.ts', mode: 'client' },
  ],
  fontawesome: {
    icons: {
      solid: ['repeat', 'heart', 'bell', 'right-from-bracket', 'house', 'reply', 'book-open', 'share-nodes'],
      regular: ['comment', 'heart']
    }
  },
  srcDir: 'src',
})