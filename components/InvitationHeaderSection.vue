<template>
  <section>
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
  background-image: url("/images/header-mobile.jpg");
  background-size: cover;
  background-position: 0 50%;
  background-repeat: no-repeat;
  margin-bottom: 4rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

section p,
section header {
  --text-border-color: black;
  --text-border-size: 2px;
  --text-border-blur: 1px;

  filter: drop-shadow(
      var(--text-border-color) var(--text-border-size) 0 var(--text-border-blur)
    )
    drop-shadow(
      var(--text-border-color) 0 var(--text-border-size) var(--text-border-blur)
    )
    drop-shadow(
      var(--text-border-color) calc(-1 * var(--text-border-size)) 0
        var(--text-border-blur)
    )
    drop-shadow(
      var(--text-border-color) 0 calc(-1 * var(--text-border-size))
        var(--text-border-blur)
    );
  color: var(--accent);
  max-width: 1080px;
  text-align: center;
}

p,
h1 {
  padding: 0.5rem 0.25rem;
}

section p strong {
  color: var(--accent);
  color: black;
  background-color: var(--accent);
  padding: 2px;
  white-space: nowrap;
}
@media (min-width: 481px) and (max-width: 1024px) {
  section {
    background-image: url("images/header-tablet.jpg");
  }
}
@media screen and (min-width: 1025px) {
  section p strong {
    padding: 4px;
    white-space: nowrap;
  }
  section {
    background-position: 0 40%;
    background-image: url("/images/header.jpg");
  }
}
</style>
