<template>
  <select v-model="model">
    <option :value="undefined">--Optional--</option>
    <option v-if="showUndetermined" :value="`UNDETERMINED`">
      Undetermined
    </option>
    <option :value="`YES`">Yes</option>
    <option :value="`NO`">No</option>
  </select>
</template>
<script setup lang="ts">
import type { Choice } from "@prisma/client";

const model = defineModel<Choice | undefined>();
const { showUndetermined = false } = defineProps<{
  showUndetermined?: boolean;
}>();
</script>
