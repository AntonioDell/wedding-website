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
import { useAuth } from "~/composables/auth";

const route = useRoute();
const router = useRouter();
const { invitationCode } = useAuth();

const code = computed(
  () => (route.query.code as string) || invitationCode.value || undefined
);

const { start: startCountdownToRedirect } = useTimeoutFn(
  () => {
    router.push({ path: "/welcome", hash: router.currentRoute.value.hash });
  },
  1000,
  {
    immediate: false,
  }
);

function onCodeIsValid(invitation: Invitation) {
  invitationCode.value = invitation.code;
  startCountdownToRedirect();
}

function onCodeIsInvalid() {
  invitationCode.value = undefined;
  startCountdownToRedirect();
}
</script>
