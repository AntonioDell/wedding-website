<template>
  <div style="position: relative">
    <PixiesCanvas />
    <NuxtRouteAnnouncer />
    <NuxtPage></NuxtPage>
  </div>
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
  opacity: 0;
  filter: blur(1rem);
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("/dark_forest.jpg") no-repeat fixed 0 0 / cover,
    radial-gradient(
      circle at 50% 50%,
      var(--light-purple),
      var(--purple),
      var(--dark-purple)
    );
  background-blend-mode: multiply;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0;
  padding: 0;
  color: white;
}
</style>
