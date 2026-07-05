// Nuxt 4 config — SSG (static site generation) for Cloudflare Pages.
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },

  // SSG: `nuxt generate` outputs to .output/public/
  nitro: {
    preset: 'static',
  },

  app: {
    head: {
      title: 'sunlit — Nuxt',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A tiny web toy that simulates warm sunlight through window blinds. Nuxt 4 port.' },
        { property: 'og:title', content: 'Sunlit — Nuxt' },
        { property: 'og:description', content: 'A tiny web toy that simulates warm sunlight through window blinds. Nuxt 4 port.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://sunlit-nuxt.pages.dev/' },
        { property: 'og:image', content: 'https://sunlit-nuxt.pages.dev/og-image.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },

  css: ['~/assets/styles.css'],
});
