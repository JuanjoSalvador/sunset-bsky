// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    keepalive: true,
    head: {
      title: 'Sunset',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
  css: ['bulma/css/bulma.min.css'],
  modules: [
    '@pinia/nuxt',
    '@vesp/nuxt-fontawesome',
    'nuxt-twemoji',
    '@nuxtjs/google-fonts',
    'nuxt-toast'
  ],
  plugins: [
    {
      src: '~/plugins/bsky-agent.ts',
      mode: 'client'
    },
  ],
  fontawesome: {
    icons: {
      solid: ['repeat', 'heart', 'bell', 'right-from-bracket', 'house', 'reply', 'book-open', 'share-nodes', 'user-plus'],
      regular: ['comment', 'heart'],
      brands: ['github', 'bluesky']
    }
  },
  srcDir: 'src',
})
