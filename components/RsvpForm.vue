<template>
  <section>
    <header><h2>RSVP</h2></header>
    <RsvpFormSingle
      v-if="guestType === `SINGLE`"
      :single="single!"
      :wedding="wedding"
      :accommodation="accommodation"
    />
    <RsvpFormCouple
      v-else-if="guestType === `COUPLE`"
      :couple="couple!"
      :wedding="wedding"
      :accommodation="accommodation"
    />
    <RsvpFormFamily
      v-else
      :family="family!"
      :family-members="familyMembers!"
      :wedding="wedding"
      :accommodation="accommodation"
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
} from "@prisma/client";

const { guestType } = defineProps<{
  guestType: GuestType;
  wedding: Wedding;
  accommodation: Accommodation;
  single: Single | undefined;
  couple: Couple | undefined;
  family: Family | undefined;
  familyMembers: FamilyMember[] | undefined;
}>();
</script>
