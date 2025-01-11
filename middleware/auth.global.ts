export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path === "/" || to.path === "/invalid-code") return;
  else if (to.path === "/admin") {
    return;
  }

  const { invitationCode } = useAuth();
  if (!invitationCode.value) return navigateTo("/");

  const invitation = await $fetch("/api/invitations", {
    headers: { Authorization: invitationCode.value },
  });
  if (!invitation) return navigateTo("/invalid-code");
});
