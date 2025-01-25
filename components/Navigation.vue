<template>
  <Transition name="slide-down">
    <nav v-if="isNavigationVisible" class="navbar">
      <template v-for="link in links" :key="link.to"
        ><span
          >&#9001;
          <NuxtLink :to="link.to">
            {{ link.label }}
          </NuxtLink>
          &#9002;</span
        ></template
      >
    </nav>
  </Transition>
</template>
<script setup lang="ts">
import { useScroll, useWindowSize } from "@vueuse/core";
import { toRefs } from "vue";

const links = [
  { to: "#top", label: "Zum Anfang" },
  { to: "#rsvp", label: "RSVP" },
  { to: "#location", label: "Schloss Oberndorf" },
  { to: "#theme", label: "Thema" },
  { to: "#accommodation", label: "Unterkünfte" },
  { to: "#itinerary", label: "Ablauf" },
  { to: "#gallery", label: "Gallerie" },
];

const router = useRouter();
const { width } = useWindowSize();
const welcomeRef = ref<HTMLElement | null>(null);
const { isScrolling, directions } = useScroll(welcomeRef);
const { top: toTop } = toRefs(directions);

const forceNavigationHidden = ref<boolean>(false);
const isNavigationVisible = computed<boolean>((oldValue) => {
  if (width.value > 812) return true;
  if (forceNavigationHidden.value) return false;
  else if (!isScrolling.value) return oldValue === undefined ? true : oldValue;
  return toTop.value;
});

watch(router.currentRoute, (newValue) => {
  if (import.meta.server) return;
  const hash = newValue.hash;
  if (hash) onLinkClicked(hash.slice(1));
});

watch(isScrolling, () => {
  forceNavigationHidden.value = false;
});

onMounted(() => {
  welcomeRef.value = document.getElementById("welcome");
  const hash = router.currentRoute.value.hash;
  if (hash) onLinkClicked(hash.slice(1));
});

function onLinkClicked(elementId: string) {
  const el = document.getElementById(elementId);
  el?.scrollIntoView({ behavior: "smooth" });
  forceNavigationHidden.value = true;
}
</script>
<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: black;
  padding: 0.5rem 0;
  gap: 0.5rem;
  z-index: 100;
  white-space: nowrap;
  line-break: strict;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease-in-out;
}
.slide-down-enter-from,
.slide-down-leave-to {
  transform: translatey(-100%);
}
</style>
