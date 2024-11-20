export const useInvitationStore = defineStore("invitations", () => {
  const invitation = ref<{ code: string; id: number }>();

  onMounted(() => {
    const storedInvitation = localStorage.getItem("invitation");
    if (storedInvitation) invitation.value = JSON.parse(storedInvitation);
  });

  watch(invitation, (newValue) => {
    localStorage.setItem("invitation", JSON.stringify(newValue));
  });

  return { invitation };
});
