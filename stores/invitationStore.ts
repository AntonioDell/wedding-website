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
    console.log("What");
    if (import.meta.server) return undefined;
    console.log("Where");
    const storedInvitationCode = localStorage.getItem("invitationCode");
    console.log(storedInvitationCode);
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
