<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <legend>Wir werden...</legend>
      <p>
        <input
          type="radio"
          id="rsvpAccepted"
          name="rsvp"
          v-model="rsvpRespond"
          :value="`YES`"
        />
        <label for="rsvpAccepted">sehr gerne dabei sein!</label>
      </p>
      <p>
        <input
          type="radio"
          id="rsvpRejected"
          name="rsvp"
          v-model="rsvpRespond"
          :value="`NO`"
        />
        <label for="rsvpRejected">leider nicht kommen können.</label>
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
      {{ couple.is_coming === `YES` ? "Zusage aktualisieren" : "Zusagen" }}
    </button>
    <button
      v-else-if="rsvpRespond === `NO`"
      type="submit"
      style="align-self: center"
      :disabled="isLoading"
    >
      {{ couple.is_coming === `NO` ? "Absage aktualisieren" : "Absagen" }}
    </button>
    <p v-else-if="rsvpRespond === `UNDETERMINED` && couple.is_coming === `NO`">
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
import type { Accommodation, Choice, Couple, Wedding } from "@prisma/client";
import dayjs from "dayjs";
import { FetchError } from "ofetch";

const { wedding, couple, accommodation } = defineProps<{
  wedding: Wedding;
  couple: Couple;
  accommodation: Accommodation;
}>();

const rsvpRespond = ref<Choice>(couple.is_coming);
const accommodationChoice = ref<Choice>(accommodation.is_accepted);

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
