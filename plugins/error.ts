export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("vue:error", (...args) => {
    console.error("vue:error", ...args);
  });
  nuxtApp.hook("app:error", (...args) => {
    console.error("app:error", ...args);
  });
  nuxtApp.vueApp.config.errorHandler = (...args) => {
    console.error("global error handler", ...args);
    console.error("global error handler");
  };
});
