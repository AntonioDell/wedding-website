<template>
  <a
    v-if="isApple"
    :href="`http://maps.apple.com/?sll=${lat},${long}&z=10&t=s`"
    target="_blank"
  >
    <slot></slot>
  </a>
  <a
    v-else
    :href="`https://www.google.com/maps/search/?api=1&query=${lat},${long}`"
    target="_blank"
  >
    <slot></slot>
  </a>
</template>
<script setup lang="ts">
defineProps<{ lat: string; long: string }>();

const { isApple } = useDevice();
</script>
