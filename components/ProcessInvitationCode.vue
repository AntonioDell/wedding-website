<template>
  <p v-if="showProcessing">Checking your invitation...</p>
  <p v-else-if="status === `success`">Please step right in.</p>
  <p v-else-if="status === `error`">You are not invited.</p>
</template>
<script setup lang="ts">
import type { AsyncDataRequestStatus } from "#app";
import type { Invitation } from "@prisma/client";
import { useTimeout } from "@vueuse/core";

const emit = defineEmits<{
  "code-is-valid": [Invitation];
  "code-is-invalid": [void];
}>();
const props = defineProps<{ code?: string | null }>();

const status = ref<AsyncDataRequestStatus>("pending");
const invitation = ref<Invitation | null>(null);

watch(
  () => props.code,
  async () => {
    status.value = "pending";
    try {
      if (!props.code) throw Error();
      else {
        const code = props.code;
        const result = await $fetch("/api/invitations", {
          headers: { Authorization: code },
        });
        invitation.value = result;
      }
      status.value = "success";
    } catch (e) {
      invitation.value = null;
      status.value = "error";
    }
  },
  { immediate: true }
);

const minimumTimeToShowProcessing = useTimeout(1000);

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
      if (status.value === "success")
        emit("code-is-valid", invitation.value as Invitation);
      else if (status.value === "error") emit("code-is-invalid");
    }
  },
  { immediate: true }
);
</script>
