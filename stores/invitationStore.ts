import { skipHydrate } from "pinia";

export const useInvitationStore = defineStore("invitations", () => {
  const invitation = ref<{ code: string }>();
  const invitationCode = ref<string>(getFromLocalStorage());

  onMounted(() => {
    invitationCode.value = getFromLocalStorage();
  });

  watch(invitation, (newValue) => {
    if (import.meta.server) return;

    if (newValue)
      localStorage.setItem("invitationCode", JSON.stringify(newValue.code));
  });

  function getFromLocalStorage() {
    if (import.meta.server) return undefined;
    const storedInvitationCode = localStorage.getItem("invitationCode");
    if (storedInvitationCode && storedInvitationCode !== "undefined")
      return JSON.parse(storedInvitationCode);
    else {
      localStorage.clear();
      return undefined;
    }
  }

  return {
    invitation,
    invitationCode,
  };
});
