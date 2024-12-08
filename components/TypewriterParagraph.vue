<template>
  <p>
    <slot></slot>
  </p>
</template>
<script setup lang="ts">
// TODO: Animate multiple <p> such that they appear typed by a typewriter correctly

const { speed = 2 } = defineProps<{ speed?: number }>();
const slots = defineSlots<{ default(): VNode[] }>();

const charCount = computed(() => {
  if (slots.default().length === 0) return 0;
  return slots
    .default()
    .map((node) => (node.children?.length as number) || (0 as number))
    .reduce((previousValue, currenntValue) => previousValue + currenntValue, 0);
});

const cssCharCount = computed(() => {
  return `${charCount.value}ch`;
});

const cssSpeed = computed(() => `${speed}s`);
</script>
<style scoped>
p {
  width: v-bind(cssCharCount);
  animation: typing v-bind(cssSpeed) steps(v-bind(charCount)),
    blink 0.5s step-end infinite alternate;
  white-space: pre-line;
  overflow: hidden;
  border-right: 3px solid;
  font-family: monospace;
  font-size: 2em;
}
@keyframes typing {
  from {
    width: 0;
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}
</style>
