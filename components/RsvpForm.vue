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
    <Transition name="slide">
      <fieldset v-if="rsvpRespond === `ACCEPTED` && addresseeType === `SINGLE`">
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
    </Transition>
    <Transition name="slide">
      <fieldset v-if="plusOneYesNo">
        <legend>Und zwar...</legend>
        <input
          type="text"
          id="plusOnePerson"
          name="plusOnePerson"
          v-model="plusOnePerson"
          placeholder="Bitte Vor- und Nachnamen angeben"
        /></fieldset
    ></Transition>
    <button
      v-if="rsvpRespond === `ACCEPTED`"
      type="submit"
      style="align-self: center"
    >
      {{ currentStatus === `ACCEPTED` ? "Zusage aktualisieren" : "Zusagen" }}
    </button>
    <button
      v-else-if="rsvpRespond === `REJECTED`"
      type="submit"
      style="align-self: center"
    >
      {{ currentStatus === `REJECTED` ? "Absage aktualisieren" : "Absagen" }}
    </button>
    <p v-else-if="rsvpRespond === `PENDING` && currentStatus === `REJECTED`">
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

function onSubmit() {}
</script>
<style lang="css" scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
fieldset {
  display: flex;
  flex-direction: column;
  align-items: start;
  transition: cubic-bezier(1, 0, 0, 1);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-in-out;
  opacity: 1;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(50%);
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
