<template>
  <section>
    <header><h2>RSVP</h2></header>
    <RsvpFormSingle
      v-if="guestType === `SINGLE`"
      :single="single!"
      :wedding="wedding"
      :accommodation="accommodation"
      :is-coming
    />
    <RsvpFormCouple
      v-else-if="guestType === `COUPLE`"
      :couple="couple!"
      :wedding="wedding"
      :accommodation="accommodation"
      :is-coming
    />
    <RsvpFormFamily
      v-else
      :family="family!"
      :family-members="familyMembers!"
      :wedding="wedding"
      :accommodation="accommodation"
      :is-coming
    />
  </section>
</template>
<script setup lang="ts">
import type {
  Accommodation,
  Couple,
  Family,
  FamilyMember,
  GuestType,
  Single,
  Wedding,
  Choice,
} from "@prisma/client";

const { guestType, isComing } = defineProps<{
  guestType: GuestType;
  wedding: Wedding;
  accommodation: Accommodation;
  isComing: Choice;
  single: Single | undefined;
  couple: Couple | undefined;
  family: Family | undefined;
  familyMembers: FamilyMember[] | undefined;
}>();
</script>
