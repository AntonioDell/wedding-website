<template>
  <div id="welcome" class="welcome">
    <template v-if="welcomeData && guest && wedding">
      <Navigation
        ref="navbar"
        :is_invited_to_civil_marriage_day="
          guest?.is_invited_to_civil_marriage_day
        "
      />
      <InvitationHeaderSection
        v-if="wedding && rsvpFormReady"
        id="el-top"
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
      <section id="el-rsvp">
        <header>
          <u><h2>RSVP</h2></u>
        </header>
        <RsvpForm
          v-if="rsvpFormReady"
          :guest
          :wedding
          :accommodation="welcomeData.accommodation"
          :single
          :couple
          :family
          :family-members
        />
        <NoteForm
          v-if="rsvpFormReady"
          :note="guest.note"
          class="narrow-section"
          style="margin-top: 1rem"
        />
      </section>
      <section
        v-if="guest.is_invited_to_civil_marriage_day"
        id="el-civil"
        class="narrow-section"
      >
        <header>
          <u><h2>Die standesamtliche Trauung</h2></u>
        </header>
        <p>
          Unsere standesamtliche Trauung im kleinen Kreis findet am
          {{
            dateOnlyFormat.format(dayjs(wedding.civil_marriage_date).toDate())
          }}
          in Bonn statt.
        </p>
        <p>
          Wir würden uns sehr freuen wenn du/ihr dabei wärt, aber da wir unsere
          eigentliche Hochzeit am
          {{ dateOnlyFormat.format(dayjs(wedding.date).toDate()) }} als die
          wichtigere sehen, ist es nicht schlimm, falls du/ihr bei der
          Standesamtlichen nicht dabei sein könnt.
        </p>
        <p>
          Die standesamtliche Trauung wird im Rathaus Hardtberg um
          {{
            timeOnlyFormat.format(dayjs(wedding.civil_marriage_date).toDate())
          }}
          Uhr stattfinden. Danach werden wir in das Lokal Haus Müllestumpe
          einkehren und zu Mittag essen. Das Lokal ist bis Nachts für uns
          reserviert.
        </p>
        <p>
          Solltet ihr für den Tag eine Unterkunft benötigen, könnt ihr entweder
          in Haus Müllestumpe selbst ein Zimmer buchen über die
          <a href="https://via.eviivo.com/Mullestumpe53117" target="_blank"
            >offizielle Website</a
          >
          oder eine anderes Hotel/AirBnB in der Nähe suchen.
        </p>
        <ul>
          <li>
            Rathaus Hardtberg:
            <LocationLink lat="50.716278" long="7.051489">
              Villemombler Str. 1, 53123 Bonn
            </LocationLink>
          </li>
          <li>
            Haus Müllestumpe:
            <LocationLink lat="50.757106" long="7.080883">
              An d. Rheindorfer Burg 22, 53117 Bonn
            </LocationLink>
          </li>
        </ul>
      </section>
      <section id="el-location" class="narrow-section">
        <header>
          <u><h2>Unser Schloss Oberndorf</h2></u>
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
      <section id="el-theme" class="narrow-section">
        <header>
          <u><h2>Das Thema - "Dark Fairytale"</h2></u>
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
      <section
        id="el-accommodation"
        v-if="welcomeData.accommodation.is_provided"
        class="narrow-section"
      >
        <header>
          <u><h2>Deine Unterkunft</h2></u>
        </header>
        <template v-if="welcomeData.accommodation.hotel === `PENSION`">
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
        </template>
        <template v-else>
          <p>
            Ihr seid im Aparthotel Donaustern nur wenige Auto-Minuten von
            Schloss Oberndorf entfernt in einem Doppelzimmer für
            {{ welcomeData.accommodation.nights_included }} Nächte
            untergebracht. Am Abend der Hochzeit werden genug Taxis zur
            Verfügung stehen, um binnen kurzer Zeit zum Hotel zu kommen.
          </p>
          <p>
            Solltet ihr euch selbst eine andere Unterkunft besorgen, sagt uns
            bitte vorher bescheid, damit wir die Reservierung im Hotel aufheben
            können.
          </p>
          <p>
            Die Adresse lautet:<br />
            <LocationLink lat="48.669908" long="48.669908">
              Rudolf-Diesel-Str. 2<br />
              86663 Asbach-Bäumenheim
            </LocationLink>
          </p>
          <p>
            Mehr Infos zur Unterkunft findet ihr
            <a href="https://www.pension-oberndorf.de/">hier</a>.
          </p>
        </template>
      </section>
      <section v-else id="el-accommodation" class="narrow-section">
        <header>
          <u><h2>Unterkünfte</h2></u>
        </header>
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
          <p>
            Auch für mehr als zwei Personen sind Appartments vorhanden, diese
            findet man aber nicht auf der Website. Ruft einfach im Hotel an
            falls ihr daran interesse habt.
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
      <section id="el-itinerary" class="narrow-section">
        <header>
          <u><h2>Der Ablauf</h2></u>
        </header>
        <div class="timeline">
          <h3 style="grid-area: t1">14:00 Uhr</h3>
          <h3 style="grid-area: d1">Get Together</h3>
          <p style="grid-area: p1">
            Mit einem Kaltgetränk und Häppchen könnt ihr mit den anderen Gästen
            im Ambiente des Vorhofs von Schloss Oberndorf entspannen und auf den
            Beginn der Trauung warten.
          </p>
          <h3 style="grid-area: t2">15:00 Uhr</h3>
          <h3 style="grid-area: d2">Trauung</h3>
          <p style="grid-area: p2">
            Der Hauptteil unseres Hochzeitstags findet im Garten auf der
            Rückseite des Schlosses statt.
          </p>
          <h3 style="grid-area: t3">16:00 Uhr</h3>
          <h3 style="grid-area: d3">Kaffee & Kuchen</h3>
          <p style="grid-area: p3">
            Nach der Trauung stärken wir uns mit Kaffee und Kuchen im
            Wintergarten.
          </p>
          <h3 style="grid-area: t4">17:00 Uhr</h3>
          <h3 style="grid-area: d4">Essen</h3>
          <p style="grid-area: p4">
            Für reichlich Verpflegung ist im Gewölbe des Schlosses gesorgt.
          </p>
          <h3 style="grid-area: t5">2:00 Uhr</h3>
          <h3 style="grid-area: d5">Ende</h3>
          <p style="grid-area: p5">
            Um 2 Uhr ist spätestens Schicht im Schacht, da die Nachtruhe im
            Schloss beginnt.
          </p>
          <hr class="seperator" />
        </div>
      </section>
      <section id="el-gallery">
        <header>
          <u><h2>Gallerie</h2></u>
        </header>
        <Gallery></Gallery>
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
import dayjs from "dayjs";
import { Countdown } from "vue3-flip-countdown";

const navbarRef = useTemplateRef("navbar");
const { height: navbarHeight } = useElementSize(navbarRef);
const { dateOnlyFormat, timeOnlyFormat } = useFormat();
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
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
}

.narrow-section {
  max-width: 1080px;
}

h2 {
  text-align: center;
}

.timeline {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: minmax(100px, auto);
  grid-template-areas:
    "t1 d1"
    "p1 p1"
    "t2 d2"
    "p2 p2"
    "t3 d3"
    "p3 p3"
    "t4 d4"
    "p4 p4"
    "t5 d5"
    "p5 p5";
}
.seperator {
  grid-area: seperator;
  transform: rotate(90);
  display: none;
}
.timeline > h3:nth-of-type(even) {
  text-align: start;
}
.timeline > h3:nth-of-type(odd) {
  text-align: end;
}

.timeline > h3:nth-of-type(odd)::after {
  content: " -";
}
.timeline > h3:nth-of-type(even)::before {
  content: "\00a0 ";
}

.timeline > p {
  text-align: start;
  justify-self: start;
  margin-top: 0;
}
@media screen and (min-width: 813px) {
  .welcome {
    padding-top: v-bind(navbarHeight);
  }

  .timeline {
    grid-row-gap: 0px;
    grid-column-gap: 0px;
    grid-template-columns: 1fr 100px 2fr;
    grid-template-areas:
      "t1 seperator d1"
      ". seperator p1"
      "t2 seperator d2"
      ". seperator p2"
      "t3 seperator d3"
      ". seperator p3"
      "t4 seperator d4"
      ". seperator p4"
      "t5 seperator d5"
      ". seperator p5";
  }
  .seperator {
    display: block;
    transform: none;
  }
  .timeline > h3:nth-of-type(even) {
    text-align: start;
  }
  .timeline > h3:nth-of-type(odd) {
    text-align: end;
  }
  .timeline > h3:nth-of-type(odd)::after {
    content: none;
  }
  .timeline > h3:nth-of-type(even)::before {
    content: none;
  }

  .timeline > p {
    text-align: start;
    justify-self: start;
    margin-top: 0;
  }
}
</style>
