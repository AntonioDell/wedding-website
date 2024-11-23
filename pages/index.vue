<template>
  <div>
    <ProcessInvitationCode
      :code
      @code-is-valid="onCodeIsValid"
      @code-is-invalid="onCodeIsInvalid"
    />
  </div>
</template>
<script setup lang="ts">
import type { Invitation } from "@prisma/client";
import { useTimeoutFn } from "@vueuse/core";
import { useInvitationStore } from "~/stores/invitationStore";

const route = useRoute();
const router = useRouter();
const invitationStore = useInvitationStore();

const code = computed(
  () =>
    invitationStore.invitation?.code ||
    (route.query.code as string) ||
    undefined
);

const { start: startCountdownToRedirect } = useTimeoutFn(
  () => {
    if (invitationStore.invitation) {
      router.push("/welcome");
    } else {
      router.push("/invalid-code");
    }
  },
  1000,
  {
    immediate: false,
  }
);

function onCodeIsValid(invitation: Invitation) {
  invitationStore.invitation = invitation;
  startCountdownToRedirect();
}

function onCodeIsInvalid() {
  invitationStore.invitation = undefined;
  startCountdownToRedirect();
}
</script>
