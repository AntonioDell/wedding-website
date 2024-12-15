export const useAuth = () => {
  const invitationCode = useState("invitation", getFromLocalStorage);

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

  watch(invitationCode, (newValue) => {
    if (newValue) localStorage.setItem("invitationCode", newValue);
    else localStorage.removeItem("invitationCode");
  });

  return {
    invitationCode,
  };
};
