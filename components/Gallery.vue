<template>
  <div class="gallery">
    <div v-for="image in images" :key="image">
      <a :href="`/images/${image}`" target="_blank">
        <NuxtImg :src="`/images/${image}`" sizes="300px"></NuxtImg>
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
const images = [
  "brautpaar_am_see.jpg",
  "brautpaar_im_wald_gehend.jpg",
  "brautpaar_im_wald_kuss.jpg",
  "brautpaar_im_wald_tanzend.jpg",
];
</script>
<style scoped>
.gallery {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.25rem;
  padding: 1rem;
}

@media screen and (min-width: 813px) {
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 0.5rem;
    max-width: 1080px;
    padding: 1rem;
  }
}
</style>
