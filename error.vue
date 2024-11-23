<template>
  <div style="display: flex; flex-direction: column">
    <h1>Something unexpected happened...</h1>
    <button @click="onBackButtonClicked">Back to safety</button>
  </div>
</template>
<script setup lang="ts">
const error = useError();
function onBackButtonClicked() {
  clearError({ redirect: "/" });
}
</script>
