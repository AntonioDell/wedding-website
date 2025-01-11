<template>
  <div id="welcome" class="welcome">
    <Navigation ref="navbar" />
    <template v-if="welcomeData && guest && wedding">
      <InvitationHeaderSection
        v-if="wedding && rsvpFormReady"
        id="top"
        :guestType="guest.type"
        :single
        :couple
        :family
        :weddingDate="weddingDateFormatted"
      />
      <ClientOnly>
        <Countdown
          v-if="wedding"
          style="text-shadow: none !important"
          labelColor="white"
          mainColor="black"
          secondFlipColor="black"
          mainFlipBackgroundColor="white"
          secondFlipBackgroundColor="white"
          :deadlineISO="wedding.date"
          :labels="{
            days: `Tage`,
            hours: `Stunden`,
            minutes: `Minuten`,
            seconds: `Sekunden`,
          }"
        ></Countdown>
      </ClientOnly>
      <RsvpForm
        v-if="rsvpFormReady"
        id="rsvp"
        :guest-type="guest.type"
        :wedding
        :accommodation="welcomeData.accommodation"
        :single
        :couple
        :family
        :family-members
      />
      <section id="location">
        <header>
          <h2>Unser Schloss Oberndorf</h2>
        </header>
        <p>
          Das Hochzeitsfest wird im bezaubernden Schloss Oberndorf stattfinden.
          Das Schloss bietet ein fabelhaftes Ambiente und reichlich Platz mit
          verschiedenen Orten im Außen- und Innenbereich. Dadurch haben wir auch
          bei schlechtem Wetter einen perfekten Ort für die Trauung.
        </p>
        <p>
          Die Adresse lautet:<br />
          <LocationLink lat="48.672103" long="10.875480">
            Fuggerallee 1<br />
            86698 Oberndorf am Lech
          </LocationLink>
        </p>
        <p>
          Mehr Infos zu Schloss Oberndorf könnt ihr auf der offiziellen Website
          finden:<br />
          <a href="https://schloss-oberndorf.de/">schloss-oberndorf.de</a>
        </p>
      </section>
      <section id="theme">
        <header>
          <h2>Das Thema - "Dark Fairytale"</h2>
        </header>
        <p>"Dark Fairytale" heißt übersetzt etwa "Dunkle Märchen".</p>
        <p>
          Gemeint sind damit sowohl die originalen Märchen von den Gebrüder
          Grimm, wie auch neuere Fantasy-Literatur, in welcher eine fantastische
          jedoch auch unterschwellig düstere Atmosphäre herrscht.
        </p>
        <p>
          Aber keine Sorge: Es soll keine Kostüm-Hochzeit werden. Vielmehr
          möchten wir euch inspirieren, eure Garderobe in einem festlich,
          fantastischen Stil auszuwählen.
        </p>
        <p>
          Ballkleider, Fracks und thematisch angehauchte Accessoirs sind gerne
          gesehen, jedoch kein Muss. Schlichte Abendgarderobe ist vollkommen
          ausreichend.
        </p>
        <!-- TODO: Add section about help for costume like fashion-->
      </section>
      <section id="accommodation" v-if="welcomeData.accommodation.is_provided">
        <header><h2>Deine Unterkunft</h2></header>
        <p>
          Ihr seid in der Pension am Mühlbach in einem
          {{
            welcomeData.accommodation.type === `TWIN_BED`
              ? "Doppelzimmer"
              : "Einzelzimmer"
          }}
          für {{ welcomeData.accommodation.nights_included }} Nächte
          untergebracht. Das ist die Unterkunft die im vorhinein für das
          Brautpaar, nahe Familie und Trauzeugen reserviert wurde.
        </p>
        <p>
          Solltet ihr euch selbst eine andere Unterkunft besorgen, sagt uns
          bitte vorher bescheid, damit wir die Reservierung in der Pension
          aufheben können.
        </p>
        <p>
          Die Adresse lautet:<br />
          <LocationLink lat="48.668162" long="10.869897">
            Fischerstraße 8<br />
            Oberndorf am Lech
          </LocationLink>
        </p>
        <p>
          Mehr Infos zur Unterkunft findet ihr
          <a href="https://www.pension-oberndorf.de/">hier</a>.
        </p>
      </section>
      <section id="accommodation" v-else>
        <header><h2>Unterkünfte</h2></header>
        <p>
          Da Schloss Oberndorf in einer ländlicheren Gegend liegt, empfehlen wir
          euch <u><strong>frühzeitig</strong></u> eine Unterkunft für die Nacht
          der Hochzeit zu buchen.
        </p>
        <p>
          Zur Orientierung haben wir euch bereits ein paar Unterkünfte
          herausgesucht.
        </p>
        <p>
          Kleiner Tipp: Organisiert euch mit anderen Gästen um Kosten für
          Hotelzimmmer und Taxis zu senken.
        </p>
        <AccommodationArticle
          link="https://aparthotel-donaustern.de/"
          lat="48.66990661621094"
          long="10.81177043914795"
        >
          <template #title>Aparthotel Donaustern</template>
          <p>
            Das Hotel ist nur 10 Minuten mit dem Auto entfernt und bietet mit
            den Business Appartments für zwei Personen alle Annehmlichkeiten die
            man sich für eine Nacht wünschen kann.
          </p>
          <template #address>
            Rudolf-Diesel-Str. 2<br />
            86663 Asbach-Bäumenheim
          </template>
        </AccommodationArticle>
        <AccommodationArticle
          link="https://www.donau-lech-camping.de"
          lat="48.675755"
          long="10.841157"
        >
          <template #title>Donau-Lech-Camping</template>
          <p>
            Lieber etwas natur-näher? Kein Problem, am Campingplatz
            Donau-Lech-Camping könnt ihr ganze entspannt mit eurem Wohnwagen
            oder Zelt 6 min Autofahrt entfernt von Schloss Oberndorf campen.
          </p>
          <p>
            Vielleicht gibt es auch andere Grünflächen näher am Schloss, aber
            dafür können wir nicht garantieren.
          </p>
          <template #address>
            Campingweg 1 <br />86698 Oberndorf am Lech
          </template>
        </AccommodationArticle>
        <AccommodationArticle>
          <template #title>Oder geht selbst auf die Suche...</template>
          <p>
            Die Gegend rund um Oberndorf am Lech bietet einige weitere
            Möglichkeiten zum Übernachten. Auf Google Maps findet ihr sicher
            etwas passendes
          </p>
          <p>
            Und keine Sorge falls das Hotel nicht in Laufdistanz zum Schloss
            ist, wir werden die lokalen Taxi-Dienstleister frühzeitig warnen,
            sodass man auch nach einer durchzechten Nacht wieder in die
            Unterkunft kommt.
          </p>
        </AccommodationArticle>
      </section>
      <section>
        <header id="itinerary"><h2>Der Ablauf</h2></header>
        <article>
          <h3>14:00 Uhr - Sektempfang</h3>
          <p>Beschreibung</p>
        </article>
        <article>
          <h3>15:00 Uhr - Trauung</h3>
          <p>Beschreibung</p>
        </article>
        <article>
          <h3>16:00 Uhr - Kaffee & Kuchen</h3>
          <p>Beschreibung</p>
        </article>
        <article>
          <h3>17:00 Uhr - Essen</h3>
          <p>Beschreibung</p>
        </article>
        <article>
          <h3>2:00 Uhr - Schluss</h3>
          <p>
            Um spätestens 2 Uhr nachts ist die Party vorbei, denn dann beginnt
            die Nachtruhe.
          </p>
        </article>
      </section>
    </template>
    <div v-else-if="status === `error`">An error occurred: {{ error }}</div>
    <div v-else>Loading wedding infos...</div>
  </div>
</template>
<script setup lang="ts">
import type {
  Accommodation,
  Couple,
  Family,
  FamilyMember,
  Guest,
  Invitation,
  Single,
  Wedding,
} from "@prisma/client";
import { useElementSize } from "@vueuse/core";
import { Countdown } from "vue3-flip-countdown";

const navbarRef = useTemplateRef("navbar");
const { height: navbarHeight } = useElementSize(navbarRef);
const { dateOnlyFormat } = useFormat();
const { $authenticatedFetch } = useNuxtApp();

const {
  data: welcomeData,
  status,
  error,
} = await useAsyncData("welcome", () =>
  $authenticatedFetch<{
    wedding: Wedding;
    guest: Guest;
    invitation: Invitation;
    accommodation: Accommodation;
  }>("/api/welcome")
);

const wedding = computed(() => welcomeData.value?.wedding);
const guest = computed(() => welcomeData.value?.guest);

const weddingDateFormatted = computed(() =>
  wedding.value?.date ? dateOnlyFormat.format(new Date(wedding.value.date)) : ""
);

const guestType = computed(() => guest.value?.type || undefined);
const single = ref<Single>();
const couple = ref<Couple>();
const family = ref<Family>();
const familyMembers = ref<FamilyMember[]>();
const rsvpFormReady = ref<boolean>(false);

watch(
  guestType,
  async (newGuestType) => {
    if (!newGuestType) return;

    if (newGuestType === "SINGLE") {
      single.value = await $authenticatedFetch<Single>("/api/single");
      couple.value = undefined;
      family.value = undefined;
      familyMembers.value = undefined;
    } else if (newGuestType === "COUPLE") {
      couple.value = await $authenticatedFetch<Couple>("/api/couple");
      single.value = undefined;
      family.value = undefined;
      familyMembers.value = undefined;
    } else {
      const { family_members: tmpFamilyMembers, ...tmpFamily } =
        await $authenticatedFetch("/api/family");
      familyMembers.value = tmpFamilyMembers;
      family.value = tmpFamily;
      single.value = undefined;
      couple.value = undefined;
    }
    rsvpFormReady.value = true;
  },
  { immediate: true }
);
</script>
<style scoped>
.welcome {
  height: 100vh;
  overflow-y: scroll;
  padding-top: v-bind(navbarHeight);
}
</style>
