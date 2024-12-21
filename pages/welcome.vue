<template>
  <div id="welcome" class="welcome">
    <Navigation ref="navbar" />
    <template
      v-if="
        weddingInfos &&
        weddingInfos.invitation &&
        weddingInfos.invitation.addressee &&
        status === `success`
      "
    >
      <section id="top" class="first-section wavey-box">
        <template v-if="weddingInfos.invitation.addressee.type === `SINGLE`">
          <header>
            <h1>Einladung für {{ weddingInfos.invitation.addressee.name }}</h1>
          </header>
          <p>
            Wir freuen uns sehr, dich zu unserer Hochzeit am
            <strong>{{ weddingDateFormatted }}</strong> einzuladen!
          </p>
          <p>
            Du bist herzlich eingeladen, auch deine:n Liebste:n mitzubringen.
          </p>
        </template>
        <template
          v-else-if="weddingInfos.invitation.addressee.type === `COUPLE`"
        >
          <header>
            <h1>Einladung für {{ weddingInfos.invitation.addressee.name }}</h1>
          </header>
          <p>
            Wir freuen uns sehr, euch zu unserer Hochzeit am
            <strong>{{ weddingDateFormatted }}</strong> einzuladen!
          </p>
        </template>
        <template v-else>
          <header>
            <h2>
              Einladung für Familie {{ weddingInfos.invitation.addressee.name }}
            </h2>
          </header>
          <p>
            Wir freuen uns sehr, euch zu unserer Hochzeit am
            <strong>{{ weddingDateFormatted }}</strong> einzuladen!
          </p>
        </template>
      </section>
      <ClientOnly>
        <Countdown
          style="text-shadow: none !important"
          labelColor="white"
          mainColor="black"
          secondFlipColor="black"
          mainFlipBackgroundColor="white"
          secondFlipBackgroundColor="white"
          :deadlineISO="weddingInfos.date"
          :labels="{
            days: `Tage`,
            hours: `Stunden`,
            minutes: `Minuten`,
            seconds: `Sekunden`,
          }"
        ></Countdown>
      </ClientOnly>
      <section id="rsvp">
        <header><h2>RSVP</h2></header>
        <RsvpForm
          :current-status="weddingInfos.invitation.status"
          :addressee-type="weddingInfos.invitation.addressee.type"
        />
      </section>
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
      <section
        id="accommodation"
        v-if="weddingInfos.invitation.accommodationProvided"
      >
        <header><h2>Deine Unterkunft</h2></header>
        <p>
          Ihr seid in der Pension am Mühlbach in einem
          {{
            weddingInfos.invitation.accommodationType === `TWIN_BED`
              ? "Doppelzimmer"
              : "Einzelzimmer"
          }}
          für {{ weddingInfos.invitation.accommodationNights }} Nächte
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
import { useElementSize } from "@vueuse/core";
import { Countdown } from "vue3-flip-countdown";
import AccommodationArticle from "~/components/AccommodationArticle.vue";

const { invitationCode } = useAuth();
const navbarRef = useTemplateRef("navbar");

const { height: navbarHeight } = useElementSize(navbarRef);

const dateOnlyFormat = new Intl.DateTimeFormat("de", { dateStyle: "long" });
const timeOnlyFormat = new Intl.DateTimeFormat("de", { timeStyle: "short" });

const weddingDateFormatted = computed(() =>
  weddingInfos.value?.date
    ? dateOnlyFormat.format(new Date(weddingInfos.value.date))
    : ""
);

const {
  data: weddingInfos,
  error,
  status,
} = await useFetch("/api/weddingInfos", {
  query: { code: invitationCode.value },
  immediate: true,
});
</script>
<style scoped>
.welcome {
  height: 100vh;
  overflow-y: scroll;
  padding-top: v-bind(navbarHeight);
}

.wavey-box {
  padding-bottom: 6rem;
  background-image: url("/images/brautpaar_am_see.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 4rem;
}

.wavey-box p,
.wavey-box header {
  --text-border-color: var(--yellow);
  --text-border-size: 1px;
  color: black;
  background-color: var(--yellow);
}
.wavey-box p strong {
  color: white;
  border: 4px solid black;
  color: black;
  padding: 4px;
}
</style>
