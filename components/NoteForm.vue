<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <legend>Nachricht an Brautpaar</legend>
      <label for="note"
        >Falls ihr noch irgendetwas sagen oder mitteilen möchtet, Fragen da sind
        oder irgendetwas anderes, könnt ihr in folgendem Feld eine Nachricht
        direkt an uns schreiben.</label
      >
      <textarea
        id="note"
        name="note"
        v-model="noteInput"
        style="width: 100%; min-height: 2rem; height: fit-content"
        maxlength="500"
        placeholder="Hier Nachricht schreiben"
      ></textarea>
    </fieldset>
    <button type="submit" :disabled="isLoading" style="align-self: center">
      Nachricht speichern
    </button>
    <p v-if="submitSuccess">Deine Nachricht wurde gespeichert!</p>
  </form>
</template>
<script setup lang="ts">
const { note = "" } = defineProps<{ note: string }>();

const noteInput = ref<string>(note);
const isLoading = ref<boolean>(false);
const submitSuccess = ref<boolean>(false);

const { $authenticatedFetch } = useNuxtApp();
async function onSubmit() {
  isLoading.value = true;
  submitSuccess.value = false;

  try {
    await $authenticatedFetch("/api/rsvpForm/note", {
      method: "POST",
      body: { note: noteInput.value },
    });
    submitSuccess.value = true;
  } catch (e: any) {
  } finally {
    isLoading.value = false;
  }
}
</script>
<style lang="css" scoped src="/assets/rsvpForm.css"></style>
