<template>
  <a
    v-if="isApple"
    :href="`http://maps.apple.com/?sll=${lat},${long}&z=10&t=s`"
  >
    <slot></slot>
  </a>
  <a v-else :href="`geo:${lat},${long}`">
    <slot></slot>
  </a>
</template>
<script setup lang="ts">
defineProps<{ lat: string; long: string }>();

const { isApple } = useDevice();
</script>
