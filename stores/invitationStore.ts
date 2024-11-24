export const useInvitationStore = defineStore("invitations", () => {
  const invitation = ref<{ code: string; id: number }>();

  onMounted(() => {
    const storedInvitation = localStorage.getItem("invitation");
    if (
      storedInvitation &&
      storedInvitation !== "undefined" &&
      storedInvitation.includes("code") &&
      storedInvitation.includes("id")
    )
      invitation.value = JSON.parse(storedInvitation);
    else {
      invitation.value = undefined;
      localStorage.clear();
    }
  });

  watch(invitation, (newValue) => {
    if (newValue) localStorage.setItem("invitation", JSON.stringify(newValue));
    else localStorage.clear();
  });

  return { invitation };
});
