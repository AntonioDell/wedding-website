<template>
  <div class="gallery">
    <div
      v-for="image in images"
      :key="image.path"
      :class="{
        'img-landscape': image.landscape && windowWidth > 813,
      }"
    >
      <a :href="`/images/${image.path}`" target="_blank">
        <NuxtImg
          :src="`/images/${image.path}`"
          :sizes="getImageSize(image.landscape)"
        ></NuxtImg>
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";

const images = [
  { path: "walking_toward_sun.jpg", landscape: false },
  { path: "flowers.jpg", landscape: true },
  { path: "kissing_at_lake.jpg", landscape: false },
  { path: "smiling_with_flowers.jpg", landscape: false },
  { path: "dancing_close_spin.jpg", landscape: false },
  { path: "walking_toward_sun_looking_away.jpg", landscape: false },
  { path: "dancing_close.jpg", landscape: false },
  { path: "standing_apart_looking_up.jpg", landscape: false },
  { path: "walking_toward_sun_looking_over_shoulder.jpg", landscape: false },
  { path: "dancing_persian.jpg", landscape: false },
  { path: "giving_flowers.jpg", landscape: true },
  { path: "kissing_in_front_of_sun.jpg", landscape: false },
  { path: "looking_into_the_distance.jpg", landscape: false },
  { path: "standing_with_flowers.jpg", landscape: false },
  { path: "dancing_long_distance.jpg", landscape: false },
];
const { width: windowWidth } = useWindowSize();

function getImageSize(landscape: boolean) {
  if (windowWidth.value <= 812) return "300px";
  let baseWidth = windowWidth.value;
  if (baseWidth > 1080) {
    baseWidth = 1080;
    const imageWidth = Math.floor(baseWidth / 3) * (landscape ? 2 : 1);
    return `${imageWidth}px`;
  } else {
    const imageWidth = Math.floor(baseWidth / 3) * (landscape ? 2 : 1);
    return `${imageWidth - 100}px`;
  }
}
</script>
<style scoped>
.gallery {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.25rem;
  padding: 1rem;
}
.img-landscape {
  grid-column-end: span 2;
}

@media screen and (min-width: 813px) {
  .gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    max-width: v-bind(windowWidth);
    padding: 1rem;
    grid-auto-flow: dense;
  }
}
</style>
