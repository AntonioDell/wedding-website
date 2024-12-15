export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path === "/" || to.path === "/invalid-code") return;

  const { invitationCode } = useAuth();
  console.log(invitationCode.value);
  if (!invitationCode.value) return navigateTo("/invalid-code");

  const invitation = await $fetch("/api/invitations", {
    query: { code: invitationCode.value },
  });
  if (!invitation) return navigateTo("/");
});
