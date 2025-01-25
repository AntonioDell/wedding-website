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
      <fieldset v-if="rsvpRespond === `YES` && accommodation.is_provided">
        <legend>
          Wir werden die Reservierung der Pension für
          {{
            accommodation.nights_included > 1
              ? `${accommodation.nights_included} Nächte`
              : `eine Nacht`
          }}
          im Doppelzimmer ...
        </legend>
        <p>
          <input
            type="radio"
            id="accommodationYes"
            name="accommodationChoice"
            v-model="accommodationChoice"
            :value="`YES`"
          />
          <label for="accommodationYes">warnehmen.</label>
        </p>
        <p>
          <input
            type="radio"
            id="accommodationNo"
            name="accommodationChoice"
            v-model="accommodationChoice"
            :value="`NO`"
          />
          <label for="accommodationNo">
            nicht nutzen und uns ggfs. eigenständig etwas suchen.
          </label>
        </p>
      </fieldset>
    </Transition>
    <button
      v-if="rsvpRespond === `YES`"
      type="submit"
      style="align-self: center"
      :disabled="isLoading"
    >
      {{ guest.is_coming === `YES` ? "Zusage aktualisieren" : "Zusagen" }}
    </button>
    <button
      v-else-if="rsvpRespond === `NO`"
      type="submit"
      style="align-self: center"
      :disabled="isLoading"
    >
      {{ guest.is_coming === `NO` ? "Absage aktualisieren" : "Absagen" }}
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
  Couple,
  Guest,
  Wedding,
} from "@prisma/client";
import dayjs from "dayjs";
import { FetchError } from "ofetch";

const { guest, wedding, couple, accommodation } = defineProps<{
  guest: Guest;
  wedding: Wedding;
  couple: Couple;
  accommodation: Accommodation;
}>();

const rsvpRespond = ref<Choice>(guest.is_coming);
const accommodationChoice = ref<Choice>(accommodation.is_accepted);
const rsvpCivilRespond = ref<Choice>(guest.is_coming_to_civil_marriage_day);

const { dateOnlyFormat } = useFormat();
const { $authenticatedFetch } = useNuxtApp();
const submitSuccess = ref<boolean>(false);
const isLoading = ref<boolean>(false);

async function onSubmit() {
  isLoading.value = true;
  submitSuccess.value = false;
  try {
    await $authenticatedFetch("/api/rsvpForm/couple", {
      body: {
        is_coming: rsvpRespond.value,
        is_accommodation_accepted: accommodationChoice.value,
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
