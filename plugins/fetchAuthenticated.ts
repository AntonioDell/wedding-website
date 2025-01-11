export default defineNuxtPlugin((nuxtApp) => {
  const { invitationCode } = useAuth();

  const authenticatedFetch = $fetch.create({
    onRequest({ request, options, error }) {
      if (invitationCode.value) {
        // Add Authorization header
        options.headers.set("Authorization", invitationCode.value);
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo("/login"));
      }
    },
  });
  return {
    provide: {
      authenticatedFetch,
    },
  };
});
