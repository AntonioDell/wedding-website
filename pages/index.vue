<template>
  <div>
    <h1>Hello!</h1>
    <p v-if="showProcessing">Chhecking your invitation...</p>
    <p v-else-if="status === `success`">Please step right in.</p>
    <p v-else-if="status === `error`">You are not invited.</p>
  </div>
</template>
<script setup lang="ts">
import { useTimeout, useTimeoutFn } from "@vueuse/core";

const route = useRoute();
const router = useRouter();

const { data: invitation, status } = await useFetch("/api/invitations", {
  query: route.query,
});

const minimumTimeToShowProcessing = useTimeout(1000);
const { start: startCountdownToRedirect } = useTimeoutFn(
  () => {
    // TODO: Set invitation as cookie?
    if (invitation.value) {
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

const showProcessing = computed(() => {
  return (
    status.value == `idle` ||
    status.value === `pending` ||
    !minimumTimeToShowProcessing.value
  );
});

watch(
  showProcessing,
  () => {
    if (!showProcessing.value) {
      startCountdownToRedirect();
    }
  },
  { immediate: true }
);
</script>
