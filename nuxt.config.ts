import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
toaster: {
    position: 'top-right', // Correct options: 'top-left' | 'top-center' | 'top-right'
    expand: true           // Optional: cleanly stacks sequential notifications
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  vite: {
      plugins: [
        tailwindcss(),
      ],
      optimizeDeps: {
            include: [
              '@vue/devtools-core',
              '@vue/devtools-kit',
            ]
          }
    },
  modules: [
    '@vee-validate/nuxt',
    '@nuxt/ui',
   ],
})
