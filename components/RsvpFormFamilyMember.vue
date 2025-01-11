<template>
  <li>
    <span>{{ member.name }}</span>
    <span v-if="member.is_child_under_14 === 'YES'">
      (Kind unter 14 Jahren)
    </span>
  </li>
</template>
<script setup lang="ts">
import type { Choice } from "@prisma/client";

const { member } = defineProps<{
  member: {
    name: string;
    member_id: number;
    is_child_under_14: Choice;
  };
}>();
</script>
