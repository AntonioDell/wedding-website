export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path === "/" || to.path === "/invalid-code") return;

  const { invitationCode } = useAuth();
  if (!invitationCode.value) return navigateTo("/");

  const invitation = await $fetch("/api/invitations", {
    query: { code: invitationCode.value },
  });
  if (!invitation) return navigateTo("/invalid-code");
});
