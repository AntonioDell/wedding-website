<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <legend>Ich/Wir werden...</legend>
      <p>
        <input
          type="radio"
          id="rsvpAccepted"
          name="rsvp"
          v-model="rsvpRespond"
          :value="InvitationStatus.ACCEPTED"
        />
        <label for="rsvpAccepted">sehr gerne dabei sein!</label>
      </p>
      <p>
        <input
          type="radio"
          id="rsvpRejected"
          name="rsvp"
          v-model="rsvpRespond"
          :value="InvitationStatus.REJECTED"
        />
        <label for="rsvpRejected">leider nicht kommen.</label>
      </p>
    </fieldset>
    <template v-if="rsvpRespond === `ACCEPTED` && addresseeType === `SINGLE`">
      <fieldset>
        <legend>Ich bringe...</legend>
        <p>
          <input
            type="radio"
            id="plusOneNo"
            name="plusOne"
            v-model="plusOneYesNo"
            :value="false"
          />
          <label for="plusOneNo">niemanden mit.</label>
        </p>
        <p>
          <input
            type="radio"
            id="plusOneYes"
            name="plusOne"
            v-model="plusOneYesNo"
            :value="true"
          />
          <label for="plusOneYes">jemanden mit.</label>
        </p>
      </fieldset>
      <fieldset v-if="plusOneYesNo">
        <legend>Und zwar...</legend>
        <input
          type="text"
          id="plusOnePerson"
          name="plusOnePerson"
          v-model="plusOnePerson"
          placeholder="Bitte Vor- und Nachnamen angeben"
        />
      </fieldset>
    </template>
    <button
      v-if="rsvpRespond === `ACCEPTED` || rsvpRespond === `PENDING`"
      type="submit"
    >
      {{ submitLabel }}
    </button>
    <p v-else>
      Es ist sehr schade, dass du/ihr nicht kommen könnt. Falls ihr es euch
      anders überlegt, könnt ihr eure Absage in diesem Formular bis 2 Wochen vor
      der Hochzeit ändern.
    </p>
  </form>
</template>
<script setup lang="ts">
import { AddresseeType, InvitationStatus } from "@prisma/client";

const { currentStatus } = defineProps<{
  currentStatus: InvitationStatus;
  addresseeType: AddresseeType;
}>();

const rsvpRespond = ref<InvitationStatus>(currentStatus);
const plusOneYesNo = ref<boolean>(false);
const plusOnePerson = ref<string>();

watch(plusOneYesNo, (newValue) => {
  if (!newValue) plusOnePerson.value = "";
});

const hideSubmitButton = computed(() => {
  return currentStatus === "REJECTED" && rsvpRespond.value === "REJECTED";
});

const submitLabel = computed(() => {
  if (currentStatus === `PENDING`)
    return rsvpRespond.value === "ACCEPTED" ? "Zusagen" : "Absagen";
  else if (currentStatus === `ACCEPTED`) return "Zusage aktualisieren";
  else return "Absage aktualisieren";
});

function onSubmit() {}
</script>
<style lang="css" scoped>
fieldset {
  display: flex;
  flex-direction: column;
  align-items: start;
}
</style>
