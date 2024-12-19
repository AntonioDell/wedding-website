<template>
  <nav class="navbar" ref="navbar">
    <NuxtLink to="#top">Zum Anfang</NuxtLink>
    <NuxtLink to="#rsvp">RSVP</NuxtLink>
    <NuxtLink to="#location">Schloss Oberndorf</NuxtLink>
    <NuxtLink to="#theme">Thema</NuxtLink>
    <NuxtLink to="#accommodation">Unterkünfte</NuxtLink>
    <NuxtLink to="#itinerary">Ablauf</NuxtLink>
  </nav>
</template>
<script setup lang="ts">
import { useScroll } from "@vueuse/core";

const navbarRef = useTemplateRef("navbar");

const { isScrolling, directions } = useScroll(document.querySelector("body"));
const { bottom: toBottom, top: toTop } = toRefs(directions);

watch(isScrolling, () => {
  if (!isScrolling.value || !navbarRef.value) return;
  if (toBottom.value)
    navbarRef.value.style.top = `-${navbarRef.value.clientHeight}px`;
  else if (toTop.value) navbarRef.value.style.top = `0px`;
});
</script>
<style scoped>
.navbar {
  position: sticky;
  top: 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: black;
  z-index: 100;
}

@media screen and (min-width: 812px) {
  .navbar {
    flex-direction: row;
    padding: 0.5rem 0;
  }
}
</style>
