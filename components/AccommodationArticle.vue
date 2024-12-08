<template>
  <article>
    <h3><slot name="title"></slot></h3>
    <slot></slot>
    <p v-if="lat && long">
      <a :href="`geo:${lat},${long}`">
        <slot name="address"></slot>
      </a>
    </p>
    <p v-if="link">
      <a :href="link" target="_blank">Mehr Infos hier</a>
    </p>
  </article>
</template>
<script setup lang="ts">
defineProps<{ lat?: string; long?: string; link?: string }>();
</script>
