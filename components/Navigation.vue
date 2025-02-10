<template>
  <div v-if="isSmallScreen">
    <button id="navbutton" class="navbutton" @click="onNavigationButtonClicked">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        width="24px"
        viewBox="0 -960 960 960"
        fill="undefined"
      >
        <path
          d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"
        />
      </svg>
    </button>
    <dialog ref="dialogRef" class="test">
      <button
        autofocus
        @click="onDialogCloseButtonClick"
        class="dialog-close-btn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          width="24px"
          viewBox="0 -960 960 960"
          fill="var(--accent)"
        >
          <path
            d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
          />
        </svg>
      </button>
      <div class="sidemenu">
        <div class="sidemenu-links">
          <template v-for="link in links" :key="link.to">
            <span style="color: black">
              <NuxtLink :to="link.to">
                {{ link.label }}
              </NuxtLink>
            </span>
          </template>
        </div>
      </div>
    </dialog>
  </div>
  <nav v-else class="navbar">
    <template v-for="link in links" :key="link.to">
      <span style="color: black">
        &#9001;
        <NuxtLink :to="link.to">
          {{ link.label }}
        </NuxtLink>
        &#9002;
      </span>
    </template>
  </nav>
</template>
<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";

const { is_invited_to_civil_marriage_day } = defineProps<{
  is_invited_to_civil_marriage_day: boolean;
}>();

const links = computed(() => {
  const list = [
    { to: "#top", label: "Zum Anfang" },
    { to: "#rsvp", label: "RSVP" },
    { to: "#location", label: "Schloss Oberndorf" },
    { to: "#theme", label: "Thema" },
    { to: "#accommodation", label: "Unterkünfte" },
    { to: "#itinerary", label: "Ablauf" },
    { to: "#gallery", label: "Galerie" },
  ];
  if (is_invited_to_civil_marriage_day) {
    list.splice(2, 0, { to: "#civil", label: "Standesamt" });
  }
  return list;
});

const router = useRouter();
const { width } = useWindowSize();
const welcomeRef = ref<HTMLElement | null>(null);

const isSmallScreen = computed(() => width.value <= 1079);
const dialogRef = useTemplateRef("dialogRef");

watch(router.currentRoute, (newValue) => {
  if (import.meta.server) return;
  const hash = newValue.hash;
  if (hash) onLinkClicked(hash.slice(1));
});

onMounted(() => {
  welcomeRef.value = document.getElementById("welcome");
  const hash = router.currentRoute.value.hash;
  if (hash) onLinkClicked(hash.slice(1));
});

function onLinkClicked(elementId: string) {
  const el = document.getElementById(`el-${elementId}`);
  el?.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
  dialogRef.value?.close();
}

function onNavigationButtonClicked() {
  dialogRef.value?.showModal();
}
function onDialogCloseButtonClick() {
  dialogRef.value?.close();
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
  background-color: var(--accent);
  padding: 0.5rem 0;
  gap: 0.5rem;
  z-index: 100;
  white-space: nowrap;
  line-break: strict;
}

.navbutton {
  position: fixed;
  right: 0;
  margin: 1rem;
  width: 24px;
  height: 24px;
  color: var(--accent);
  background-color: var(--accent);
  border: 2px solid black;
  border-radius: 100%;
  z-index: 101;
}
.sidemenu {
  background-color: var(--accent);
  position: fixed;
  top: 0;
  right: 0;
  width: 50vw;
  height: 100vh;
  padding-top: 100px;
}
.sidemenu-links {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 50vh;
}
.dialog-close-btn {
  position: fixed;
  right: 0;
  z-index: 100;
  margin: 1rem;
  width: 24px;
  height: 24px;
  border: 2px solid var(--accent);
  color: var(--accent);
  background-color: black;
  border-radius: 100%;
}

.test {
  height: 100vh;
  width: 100vw;
  background: transparent;
  backdrop-filter: blur(1px);
}

a {
  color: black;
}

a:visited {
  color: black;
}

a:hover {
  color: var(--purple);
}

@media screen and (min-width: 1080px) {
  .navbar {
    position: fixed;
    top: 0;
    width: 100vw;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: var(--accent);
    padding: 0.5rem 0;
    gap: 0.5rem;
    z-index: 100;
    white-space: nowrap;
    line-break: strict;
  }
}
</style>
