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
  "dancing_close_spin.jpg",
  "dancing_close.jpg",
  "dancing_long_distance.jpg",
  "dancing_persian.jpg",
  "flowers.jpg",
  "giving_flowers.jpg",
  "kissing_at_lake.jpg",
  "kissing_in_front_of_sun.jpg",
  "looking_into_the_distance.jpg",
  "smiling_with_flowers.jpg",
  "standing_apart_looking_up.jpg",
  "standing_with_flowers.jpg",
  "walking_toward_sun_looking_away.jpg",
  "walking_toward_sun_looking_over_shoulder.jpg",
  "walking_toward_sun.jpg",
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
