<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <legend>Nachricht an das Brautpaar</legend>
      <label for="note">
        Falls ihr uns noch etwas mitteilen möchtet, Fragen an uns oder ein
        anderes Anliegen habt, so bitten wir euch, das untere Feld dafür zu
        nutzen. Hier könnt ihr uns auch mitteilen, ob wir Lebensmittelallergien
        oder andere Einschränkungen in der Ernährung beachten sollen.
      </label>
      <textarea
        id="note"
        name="note"
        v-model="noteInput"
        style="
          margin-top: 1rem;
          width: 100%;
          min-height: 2rem;
          height: fit-content;
        "
        maxlength="500"
        placeholder="Hier Nachricht schreiben"
      ></textarea>
      <span style="font-size: 0.7rem"
        >{{ noteInput.length }} von 500 Zeichen verbraucht</span
      >
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
