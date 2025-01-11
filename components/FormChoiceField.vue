<template>
  <select v-model="model">
    <option :value="undefined">--Optional--</option>
    <option v-if="showUndetermined" :value="Choice.UNDETERMINED">
      Undetermined
    </option>
    <option :value="Choice.YES">Yes</option>
    <option :value="Choice.NO">No</option>
  </select>
</template>
<script setup lang="ts">
import { Choice } from "@prisma/client";

const model = defineModel<Choice | undefined>();
const { showUndetermined = false } = defineProps<{
  showUndetermined?: boolean;
}>();
</script>
