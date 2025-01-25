<template>
  <form @submit.prevent="onSubmit">
    <fieldset v-if="guest.is_invited_to_civil_marriage_day">
      <legend>
        Wir werden zur standesamtlichen Trauung am
        {{
          dateOnlyFormat.format(dayjs(wedding.civil_marriage_date).toDate())
        }}...
      </legend>
      <p>
        <input
          type="radio"
          id="rsvpCivlilAccepted"
          name="rsvpCivil"
          v-model="rsvpCivilRespond"
          :value="`YES`"
        />
        <label for="rsvpCivlilAccepted">sehr gerne kommen!</label>
      </p>
      <p>
        <input
          type="radio"
          id="rsvpCivlilRejected"
          name="rsvpCivil"
          v-model="rsvpCivilRespond"
          :value="`NO`"
        />
        <label for="rsvpCivlilRejected">leider nicht kommen.</label>
      </p>
    </fieldset>
    <fieldset>
      <legend>
        Wir werden zur Hochzeit am
        {{ dateOnlyFormat.format(dayjs(wedding.date).toDate()) }}...
      </legend>
      <p>
        <input
          type="radio"
          id="rsvpAccepted"
          name="rsvp"
          v-model="rsvpRespond"
          :value="`YES`"
        />
        <label for="rsvpAccepted">sehr gerne kommen!</label>
      </p>
      <p>
        <input
          type="radio"
          id="rsvpRejected"
          name="rsvp"
          v-model="rsvpRespond"
          :value="`NO`"
        />
        <label for="rsvpRejected">leider nicht kommen.</label>
      </p>
    </fieldset>
    <Transition name="slide">
      <fieldset v-if="rsvpRespond === `YES`">
        <legend>Unsere Familie besteht aus:</legend>
        <ul>
          <RsvpFormFamilyMember
            v-for="member in familyMembers"
            :member
            :key="member.member_id"
          />
        </ul>
      </fieldset>
    </Transition>
    <button
      v-if="rsvpRespond === `YES` && guest.is_coming !== 'YES'"
      type="submit"
      style="align-self: center"
      :disabled="isLoading"
    >
      Zusagen
    </button>
    <button
      v-else-if="rsvpRespond === `NO` && guest.is_coming !== 'NO'"
      type="submit"
      style="align-self: center"
      :disabled="isLoading"
    >
      Absagen
    </button>
    <p v-else-if="rsvpRespond === `UNDETERMINED` && guest.is_coming === `NO`">
      Es ist sehr schade, dass ihr nicht kommen könnt. Falls ihr es euch anders
      überlegt, könnt ihr eure Absage in diesem Formular bis zum
      {{
        dateOnlyFormat.format(dayjs(wedding.date).subtract(2, "weeks").toDate())
      }}
      vor der Hochzeit ändern.
    </p>
    <p v-if="submitSuccess">
      Deine Änderungen wurden erfolgreich registriert. Vielen Dank!
    </p>
  </form>
</template>
<script setup lang="ts">
import type {
  Accommodation,
  Choice,
  Family,
  FamilyMember,
  Guest,
  Wedding,
} from "@prisma/client";
import dayjs from "dayjs";
import { FetchError } from "ofetch";

const { guest, wedding, family } = defineProps<{
  guest: Guest;
  wedding: Wedding;
  family: Family;
  familyMembers: FamilyMember[];
  accommodation: Accommodation;
}>();

const rsvpRespond = ref<Choice>(guest.is_coming);
const rsvpCivilRespond = ref<Choice>(guest.is_coming_to_civil_marriage_day);

const { dateOnlyFormat } = useFormat();
const { $authenticatedFetch } = useNuxtApp();

const submitSuccess = ref<boolean>(false);
const isLoading = ref<boolean>(false);

async function onSubmit() {
  isLoading.value = true;
  submitSuccess.value = false;
  try {
    await $authenticatedFetch("/api/rsvpForm/family", {
      body: {
        is_coming: rsvpRespond.value,
        is_coming_to_civil_marriage_day: rsvpCivilRespond.value,
      },
      method: "POST",
    });
    submitSuccess.value = true;
  } catch (e: any) {
    if (e instanceof FetchError) {
      // TODO: Add error handling
      console.error(e);
    }
    submitSuccess.value = false;
  } finally {
    isLoading.value = false;
  }
}
</script>
<style lang="css" scoped src="/assets/rsvpForm.css"></style>
