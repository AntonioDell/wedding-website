<template>
  <div class="welcome">
    <template v-if="status === `success` && weddingInfos">
      <div>
        <section>
          <header><h2>Salutation</h2></header>
          <template v-if="weddingInfos.addressee.type === `SINGLE`">
            <p>Dear {{ weddingInfos.addressee.name }},</p>
            <p>we are delighted to welcome you as a guest to our wedding!</p>
            <p>Please feel free to bring your loved one too.</p>
          </template>
          <template v-else-if="weddingInfos.addressee.type === `COUPLE`">
            <p>Dear {{ weddingInfos.addressee.name }},</p>
            <p>we are delighted to welcome you as a guest to our wedding!</p>
          </template>
          <template v-else>
            <p>Dear {{ weddingInfos.addressee.name }},</p>
            <p>
              we are delighted to welcome and your close family as guests to our
              wedding!
            </p>
          </template>
        </section>
      </div>
      <div>
        <section>
          <header><h2>Theme</h2></header>
          <p>Our theme for the wedding is {{ weddingInfos.theme.name }}.</p>
          <p>{{ weddingInfos.theme.description }}</p>
        </section>
      </div>
      <div>
        <section>
          <header><h2>Location</h2></header>
          <p>
            The wedding will take place in {{ weddingInfos.location.name }} at
            {{ weddingInfos.location.address }}.
          </p>
          <p>{{ weddingInfos.location.description }}</p>
          <p>{{ weddingInfos.location.link }}</p>
        </section>
      </div>
      <div>
        <section>
          <header><h2>Schedule</h2></header>
        </section>
      </div>
      <div>
        <section>
          <header><h2>Accomodations</h2></header>
          <p>We suggest one of the following accomodations:</p>
          <article v-for="accomodation in weddingInfos.accomodations">
            <h3>{{ accomodation.name }}</h3>
            <p>{{ accomodation.description }}</p>
            <p>{{ accomodation.address }}</p>
            <p>{{ accomodation.link }}</p>
          </article>
        </section>
      </div>
    </template>
    <div v-else-if="status === `error`">An error occurred: {{ error }}</div>
    <div v-else>Loading wedding infos...</div>
  </div>
</template>
<script setup lang="ts">
/* TODO: Add
  - Salutation (for different type of guests)
  - Location
  - Schedule
  - Accomodations
*/

const { invitationCode } = storeToRefs(useInvitationStore());

const {
  data: weddingInfos,
  error,
  status,
} = await useFetch("/api/weddingInfos", {
  query: { code: invitationCode },
  immediate: false,
});
</script>
<style scoped>
.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  max-height: 100vh;
}

.welcome > div {
  min-height: 100vh;
  scroll-snap-align: start;
  align-content: center;
}
section {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}
</style>
