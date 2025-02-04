<template>
  <section class="first-section">
    <template v-if="guestType === `SINGLE`">
      <header>
        <h1>Einladung für {{ single!.name }}</h1>
      </header>
      <p>
        Wir freuen uns sehr, dich zu unserer Hochzeit am
        <strong>{{ weddingDate }}</strong> einzuladen!
      </p>
      <p>Du bist herzlich eingeladen, auch deine:n Liebste:n mitzubringen.</p>
    </template>
    <template v-else-if="guestType === `COUPLE`">
      <header>
        <h1>
          Einladung für {{ couple!.partner1_name }} und
          {{ couple!.partner2_name }}
        </h1>
      </header>
      <p>
        Wir freuen uns sehr, euch zu unserer Hochzeit am
        <strong>{{ weddingDate }}</strong> einzuladen!
      </p>
    </template>
    <template v-else>
      <header>
        <h2>Einladung für Familie {{ family!.name }}</h2>
      </header>
      <p>
        Wir freuen uns sehr, euch zu unserer Hochzeit am
        <strong>{{ weddingDate }}</strong> einzuladen!
      </p>
    </template>
  </section>
</template>
<script setup lang="ts">
import type { Couple, Family, GuestType, Single } from "@prisma/client";

const { guestType, single, couple, family } = defineProps<{
  guestType: GuestType;
  single: Single | undefined;
  couple: Couple | undefined;
  family: Family | undefined;
  weddingDate: string;
}>();
</script>
<style scoped>
section {
  padding-bottom: 6rem;
  background-image: url("/images/walking_toward_sun.jpg");
  background-size: cover;
  background-position: 0 50%;
  background-repeat: no-repeat;
  margin-bottom: 4rem;
}

section p,
section header {
  --text-border-color: black;
  --text-border-size: 1px;

  filter: drop-shadow(var(--text-border-size) 0 0 var(--text-border-color))
    drop-shadow(0 var(--text-border-size) 0 var(--text-border-color))
    drop-shadow(calc(-1 * var(--text-border-size)) 0 0 var(--text-border-color))
    drop-shadow(0 calc(-1 * var(--text-border-size)) 0 var(--text-border-color));
  color: white;
}

p,
h1 {
  padding: 0.5rem 0.25rem;
}

section p strong {
  color: white;
  color: black;
  background-color: var(--accent);
  padding: 2px;
  white-space: nowrap;
}
@media screen and (min-width: 813px) {
  section p strong {
    padding: 4px;
    white-space: nowrap;
  }
  section {
    background-position: 0 40%;
  }
}
</style>
