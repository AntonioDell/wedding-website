<template>
  <section>
    <header><h2>RSVP</h2></header>
    <RsvpFormSingle
      v-if="guest.type === `SINGLE`"
      :single="single!"
      :wedding="wedding"
      :accommodation="accommodation"
      :guest
    />
    <RsvpFormCouple
      v-else-if="guest.type === `COUPLE`"
      :couple="couple!"
      :wedding="wedding"
      :accommodation="accommodation"
      :guest
    />
    <RsvpFormFamily
      v-else
      :family="family!"
      :family-members="familyMembers!"
      :wedding="wedding"
      :accommodation="accommodation"
      :guest
    />
  </section>
</template>
<script setup lang="ts">
import type {
  Accommodation,
  Couple,
  Family,
  FamilyMember,
  Guest,
  Single,
  Wedding,
} from "@prisma/client";

const { guest } = defineProps<{
  guest: Guest;
  wedding: Wedding;
  accommodation: Accommodation;
  single: Single | undefined;
  couple: Couple | undefined;
  family: Family | undefined;
  familyMembers: FamilyMember[] | undefined;
}>();
</script>
