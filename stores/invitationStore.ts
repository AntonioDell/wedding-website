export const useInvitationStore = defineStore("invitations", () => {
  const invitation = ref<{ code: string }>();
  const invitationCode = ref<string>();

  onMounted(() => {
    const storedInvitationCode = localStorage.getItem("invitationCode");
    if (storedInvitationCode && storedInvitationCode !== "undefined")
      invitationCode.value = JSON.parse(storedInvitationCode);
    else {
      invitationCode.value = undefined;
      localStorage.clear();
    }
  });

  watch(invitation, (newValue) => {
    if (newValue) {
      localStorage.setItem("invitationCode", JSON.stringify(newValue.code));
    } else localStorage.clear();
  });
  return { invitation, invitationCode };
});
