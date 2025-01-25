<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <legend>Ich werde...</legend>
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
        <label for="rsvpRejected">leider nicht kommen.</label>
      </p>
    </fieldset>
    <Transition name="slide">
      <fieldset v-if="rsvpRespond === `YES`">
        <legend>Ich bringe...</legend>
        <p>
          <input
            type="radio"
            id="plusOneNo"
            name="plusOne"
            v-model="plusOneYesNo"
            :value="`NO`"
          />
          <label for="plusOneNo">niemanden mit.</label>
        </p>
        <p>
          <input
            type="radio"
            id="plusOneYes"
            name="plusOne"
            v-model="plusOneYesNo"
            :value="`YES`"
          />
          <label for="plusOneYes">jemanden mit.</label>
        </p>
      </fieldset>
    </Transition>
    <Transition name="slide">
      <fieldset v-if="plusOneYesNo === 'YES'">
        <legend>Und zwar...</legend>
        <input
          type="text"
          id="plusOnePerson"
          name="plusOnePerson"
          v-model="plusOnePerson"
          placeholder="Bitte Vor- und Nachnamen angeben"
        /></fieldset
    ></Transition>
    <Transition name="slide">
      <fieldset v-if="accommodation.is_provided">
        <legend>
          Ich werde mein reserviertes
          {{
            accommodation.type === `SINGLE_BED`
              ? `Einzelzimmer`
              : `Doppelzimmer`
          }}
          für
          {{
            accommodation.nights_included > 1
              ? `${accommodation.nights_included} Nächte`
              : `eine Nacht`
          }}
          in der Pension ...
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
            nicht nutzen und mir ggfs. eigenständig etwas suchen.
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
      {{ isComing === `YES` ? "Zusage aktualisieren" : "Zusagen" }}
    </button>
    <button
      v-else-if="rsvpRespond === `NO`"
      type="submit"
      style="align-self: center"
      :disabled="isLoading"
    >
      {{ isComing === `NO` ? "Absage aktualisieren" : "Absagen" }}
    </button>
    <p v-else-if="rsvpRespond === `UNDETERMINED` && isComing === `NO`">
      Es ist sehr schade, dass du nicht kommen kannst. Falls du es dir anders
      überlegst, kannst du deine Absage in diesem Formular bis zum
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
import type { Accommodation, Choice, Single, Wedding } from "@prisma/client";
import dayjs from "dayjs";
import { FetchError } from "ofetch";

const { wedding, single, accommodation, isComing } = defineProps<{
  wedding: Wedding;
  single: Single;
  accommodation: Accommodation;
  isComing: Choice;
}>();

const submitSuccess = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const rsvpRespond = ref<Choice>(isComing);
const plusOneYesNo = ref<Choice>(single.plus_one);
const plusOnePerson = ref<string | null>(single.plus_one_name);
const accommodationChoice = ref<Choice>(accommodation.is_accepted);

const { dateOnlyFormat } = useFormat();
const { $authenticatedFetch } = useNuxtApp();

async function onSubmit() {
  isLoading.value = true;
  submitSuccess.value = false;
  try {
    await $authenticatedFetch("/api/rsvpForm/single", {
      body: {
        is_coming: rsvpRespond.value,
        plus_one: plusOneYesNo.value,
        plus_one_name: plusOnePerson.value,
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
