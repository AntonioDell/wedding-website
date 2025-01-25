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
      v-if="rsvpRespond === `YES` && isComing !== 'YES'"
      type="submit"
      style="align-self: center"
      :disabled="isLoading"
    >
      Zusagen
    </button>
    <button
      v-else-if="rsvpRespond === `NO` && isComing !== 'NO'"
      type="submit"
      style="align-self: center"
      :disabled="isLoading"
    >
      Absagen
    </button>
    <p v-else-if="rsvpRespond === `UNDETERMINED` && isComing === `NO`">
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
  Wedding,
} from "@prisma/client";
import dayjs from "dayjs";
import { FetchError } from "ofetch";

const { wedding, family, isComing } = defineProps<{
  wedding: Wedding;
  family: Family;
  familyMembers: FamilyMember[];
  accommodation: Accommodation;
  isComing: Choice;
}>();

const rsvpRespond = ref<Choice>(isComing);

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
