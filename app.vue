<template>
  <PixiesCanvas />
  <NuxtRouteAnnouncer />
  <NuxtPage />
</template>
<script setup lang="ts"></script>
<style>
@import url("~/assets/theme.css");

.page-enter-active,
.page-leave-active {
  transition: all 0.8s;
}
.page-enter-from,
.page-leave-to {
  opacity: 1;
  filter: blur(1rem);
  backdrop-filter: blur(1rem);
}
html {
  height: 100vh;
  position: relative;
}
html,
body {
  margin: 0;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: auto;
}

body {
  -webkit-overflow-scrolling: touch;
  overflow-x: hidden;
  overflow-y: scroll;
  background: url("/images/dark_forest.jpg") no-repeat fixed 0 0 / cover,
    radial-gradient(
        circle at 50% 50%,
        var(--light-purple),
        var(--purple),
        var(--dark-purple)
      )
      fixed;
  background-blend-mode: multiply;
  background-position: center;
  margin: 0;
  padding: 0;
  color: white;
}
</style>
