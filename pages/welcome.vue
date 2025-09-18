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
        class="after-navigation"
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
          labelColor="var(--accent)"
          mainColor="black"
          secondFlipColor="black"
          mainFlipBackgroundColor="var(--accent)"
          secondFlipBackgroundColor="var(--accent)"
          :deadlineISO="wedding.date"
          :labels="{
            days: `Tage`,
            hours: `Stunden`,
            minutes: `Minuten`,
            seconds: `Sekunden`,
          }"
        ></Countdown>
      </ClientOnly>
      <section id="el-rsvp" class="narrow-section">
        <header>
          <h2>RSVP</h2>
          <p>
            Bitte füllt das Formular aus um uns wichtige Informationen
            mitzuteilen. Ihr könnt eure Antworten bis zum
            <u
              ><strong>{{
                dateOnlyFormat.format(
                  dayjs(wedding.date).subtract(2, "weeks").toDate()
                )
              }}</strong></u
            >
            noch anpassen.
          </p>
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
          style="margin-top: 1rem"
        />
      </section>
      <section id="el-gifts" class="narrow-section">
        <header><h2>Geschenke</h2></header>
        <p>
          In unseren Kulturkreisen ist es bei Hochzeiten üblich, hauptsächlich
          Geldgeschenke zu schenken, also braucht ihr euch nicht zu viele
          Gedanken über das Geschenk zu machen.
        </p>
        <p>
          Natürlich freuen wir uns auch über Sachgeschenke mit einem
          persönlichen Touch, würden euch aber bitten nicht allzu viel Geld in
          diese zu stecken.
        </p>
        <p v-if="guest.is_invited_to_civil_marriage_day">
          Zur standesamtlichen Trauung wünschen wir uns ausschließlich eure
          Anwesenheit 💖
        </p>
      </section>
      <section
        v-if="guest.is_invited_to_civil_marriage_day"
        id="el-civil"
        class="narrow-section"
      >
        <header>
          <h2>Die standesamtliche Trauung</h2>
        </header>
        <p>
          Unsere standesamtliche Trauung findet am
          {{
            dateOnlyFormat.format(dayjs(wedding.civil_marriage_date).toDate())
          }}
          im kleinen Kreis in Bonn statt.
        </p>
        <div class="timeline reduced">
          <h3 style="grid-area: t1">11:00 Uhr</h3>
          <h3 style="grid-area: d1">Treffen am Standesamt</h3>
          <p style="grid-area: p1">
            In Vorbereitung auf die Standesamtliche Trauung treffen wir uns alle
            vor dem Rathaus Hardtberg.
          </p>
          <h3 style="grid-area: t2">11:40 Uhr</h3>
          <h3 style="grid-area: d2">Trauung und Anstoßen</h3>
          <p style="grid-area: p2">
            Im Rathaus wird die Trauung von einer Standesbeamtin durchgeführt.
            Danach stoßen wir mit Sekt und alkoholfreien Alternativen vor dem
            Ratuhaus an.
          </p>
          <h3 style="grid-area: t3">13:30 Uhr</h3>
          <h3 style="grid-area: d3">Drinks und Essen im Haus Müllestumpe</h3>
          <p style="grid-area: p3">
            Danach geht es in unser Lokal, dem
            <a href="https://muellestumpe.de">Haus Müllestumpe</a>. Der Garten
            des Lokals bietet wunderbare Kulissen um mit unserer Fotografin
            einen Foto-Shoot zu veranstalten. Im Anschluss wird ein üppiges
            Buffet inklusive Dessert aufgetischt.
          </p>
          <h3 style="grid-area: t4">ab 20:30</h3>
          <h3 style="grid-area: d4">Karaoke im Dubliners</h3>
          <p style="grid-area: p4">
            Für die Abendunterhaltung ist ein Tisch im
            <a href="https://dubliner-bonn.de/">Dubliner Irish Pub</a>
            reserviert. Hier können alle feierwütigen den Tag mit einer guten
            Portion Karaoke abschließen.
          </p>
          <hr class="seperator" />
        </div>
        <p>
          Rathaus Hardtberg:
          <LocationLink lat="50.716278" long="7.051489">
            Villemombler Str. 1, 53123 Bonn
          </LocationLink>
        </p>
        <p>
          Haus Müllestumpe:
          <LocationLink lat="50.757106" long="7.080883">
            An d. Rheindorfer Burg 22, 53117 Bonn
          </LocationLink>
        </p>
      </section>
      <section id="el-location" class="narrow-section">
        <header>
          <h2>Unser Schloss Oberndorf</h2>
        </header>
        <p>
          Das Hochzeitsfest wird im bezaubernden Schloss Oberndorf stattfinden.
          Das Schloss bietet ein fabelhaftes Ambiente und reichlich Platz mit
          unterschiedlichen Plätzen im Außen- und Innenbereich. Dadurch haben
          wir auch bei schlechtem Wetter einen perfekten Ort für die Trauung.
        </p>
        <p>
          Die Adresse lautet:<br />
          <LocationLink lat="48.672103" long="10.875480">
            Fuggerallee 1<br />
            86698 Oberndorf am Lech
          </LocationLink>
        </p>
        <p>
          Mehr Infos zum Schloss Oberndorf könnt ihr auf der offiziellen Website
          finden:<br />
          <a href="https://schloss-oberndorf.de/" target="_blank"
            >schloss-oberndorf.de</a
          >
        </p>
      </section>
      <section id="el-theme" class="narrow-section">
        <header>
          <h2>
            Das Thema - <wbr /><span style="white-space: nowrap"
              >"Dark Fairytale"</span
            >
          </h2>
        </header>
        <p>"Dark Fairytale" bedeutet übersetzt in etwa "Dunkle Märchen".</p>
        <p>
          Gemeint sind damit sowohl die originalen Märchen der Gebrüder Grimm,
          als auch neuere Fantasy-Literatur, in welcher eine fantastische,
          jedoch auch unterschwellig düstere Atmosphäre herrscht.
        </p>
        <p>
          Aber keine Sorge: Es soll keine Kostüm-Hochzeit werden. Vielmehr
          möchten wir euch inspirieren, eure Garderobe in einem festlich,
          fantastischen Stil auszuwählen.
        </p>
        <p>
          Ballkleider, Fracks und thematisch angehauchte Accessoires sind gerne
          gesehen, jedoch kein Muss. Schlichte Abendgaderobe ist vollkommen
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
          <h2>Deine Unterkunft</h2>
        </header>
        <template v-if="welcomeData.accommodation.hotel === `PENSION`">
          <p>
            Ihr seid in der Pension am Mühlbach in einem
            {{
              welcomeData.accommodation.type === `TWIN_BED`
                ? "Doppelzimmer"
                : "Einzelzimmer"
            }}
            für
            {{
              welcomeData.accommodation.nights_included > 1
                ? `${welcomeData.accommodation.nights_included} Nächte`
                : `eine Nacht`
            }}
            untergebracht. Das ist die Unterkunft die im vorhinein für das
            Brautpaar, nahe Familie und Trauzeugen reserviert wurde.
          </p>
          <p>
            Solltet ihr euch selbst eine andere Unterkunft besorgen, sagt uns
            bitte vorher Bescheid, damit wir die Reservierung in der Pension
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
            <a href="https://www.pension-oberndorf.de/" target="_blank">hier</a
            >.
          </p>
        </template>
        <template v-else>
          <p>
            Ihr seid im Aparthotel Donaustern nur wenige Auto-Minuten von
            Schloss Oberndorf entfernt in einem Doppelzimmer für
            {{
              welcomeData.accommodation.nights_included > 1
                ? `${welcomeData.accommodation.nights_included} Nächte`
                : `eine Nacht`
            }}
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
            <a href="https://aparthotel-donaustern.de/" target="_blank">hier</a
            >.
          </p>
        </template>
      </section>
      <section v-else id="el-accommodation" class="narrow-section">
        <header>
          <h2>Unterkünfte</h2>
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
          <h2>Der Ablauf</h2>
        </header>
        <p>
          Bis auf den Beginn um 14 Uhr und das Ende um 2 Uhr kann sich hier noch
          etwas ändern, also schaut gerne später nochmal rein.
        </p>
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
          <h3 style="grid-area: t4">18:30 Uhr</h3>
          <h3 style="grid-area: d4">Essen und Party</h3>
          <p style="grid-area: p4">
            Für reichlich Verpflegung ist im Gewölbe des Schlosses gesorgt. Im
            Anschluss wird die Tanzfläche mit dem Hochzeitstanz eröffnet.
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
          <h2>Galerie</h2>
        </header>
        <Gallery></Gallery>
      </section>
      <section>
        <p style="font-size: small">
          Diese Website wurde mit Liebe von Hand gemacht &#128156;
        </p>
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
import { useElementBounding, useElementSize } from "@vueuse/core";
import dayjs from "dayjs";
import { Countdown } from "vue3-flip-countdown";

const navbarRef = useTemplateRef("navbar");
const { height: navbarHeight } = useElementSize(navbarRef);
const { height: navbarHeight2 } = useElementBounding(navbarRef);
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

.timeline.reduced {
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
    "p4 p4";
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
  .after-navigation {
    margin-top: v-bind(navbarHeight2);
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
  .timeline.reduced {
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
      ". seperator p4";
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
