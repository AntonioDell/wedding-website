import type { Invitation } from "@prisma/client";
import { skipHydrate } from "pinia";
import type { Ref } from "vue";

export const useInvitationStore = defineStore("invitations", () => {
  const invitation = ref<Invitation>();
  const invitationCode = ref<Invitation["code"] | undefined>(
    getFromLocalStorage()
  );

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
    if (
      storedInvitationCode &&
      storedInvitationCode !== "undefined" &&
      storedInvitationCode !== "null"
    )
      return storedInvitationCode;
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
