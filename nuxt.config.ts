// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },

  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL, // Default in runtime
  },

  pages: true,

  routeRules: {
    "/api/invitations": { appMiddleware: "auth" },
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  modules: ["@pinia/nuxt", "@nuxt/fonts", "@nuxtjs/device", "@nuxt/image"],
});