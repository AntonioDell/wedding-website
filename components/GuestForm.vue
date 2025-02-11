<template>
  <form @submit.prevent>
    <button @click="onSaveChanges">Save changes</button>
    <div class="fields">
      <label for="guestType">Guest Type:</label>
      <select id="guestType" v-model="guestTypeInput">
        <option :value="undefined">--Select--</option>
        <option :value="`SINGLE`">Single</option>
        <option :value="`COUPLE`">Couple</option>
        <option :value="`FAMILY`">Family</option>
      </select>
      <label for="invitationCode">Code:</label>
      <div style="display: flex">
        <input
          name="invitationCode"
          type="text"
          v-model="invitationCodeInput"
        />
        <button @click="onGenerateCode">Generate</button>
      </div>
      <label for="isInvitedToCivilMarriageDay"
        >Is invited to civil marriage day?</label
      >
      <input
        type="checkbox"
        id="isInvitedToCivilMarriageDay"
        v-model="isInvitedToCivilMarriageDay"
      />
      <label for="isComing">Is coming?</label>
      <FormChoiceField id="isComing" v-model="isComing" />
      <template v-if="guestTypeInput === `SINGLE`">
        <label for="singleName">Name:</label>
        <input id="singleName" type="text" v-model="singleInput.name" />
        <label for="singlePlusOne">Brings plus one?</label>
        <FormChoiceField id="singlePlusOne" v-model="singleInput.plus_one" />
        <template v-if="singleInput.plus_one === `YES`">
          <label for="singlePlusOneName">Name of plus one:</label>
          <input
            id="singlePlusOneName"
            type="text"
            v-model="singleInput.plus_one_name"
          />
        </template>
      </template>
      <template v-else-if="guestTypeInput === `COUPLE`">
        <label for="couplePartner1Name">Name of first partner:</label>
        <input
          id="couplePartner1Name"
          type="text"
          v-model="couple.partner1_name"
        />
        <label for="couplePartner2Name">Name of second partner:</label>
        <input
          id="couplePartner2Name"
          type="text"
          v-model="couple.partner2_name"
        />
      </template>
      <template v-else-if="guestTypeInput === `FAMILY`">
        <label for="familyName">Name for salutation:</label>
        <input id="familyName" type="text" v-model="family.name" />

        <fieldset
          style="
            grid-column: 1 / 3;
            display: grid;
            grid-template-columns: 1fr 1fr;
            padding: 1rem;
            margin: 1rem;
            gap: 0.5rem;
          "
        >
          <legend>New family member</legend>
          <label for="newMemberName">Name:</label>
          <input id="newMemberName" type="text" v-model="newMemberName" />
          <label for="newMemberIsChildUnder14">Is child under 14?</label>
          <FormChoiceField
            id="newMemberIsChildUnder14"
            v-model="newMemberIsChildUnder14"
          />
          <button
            @click="onAddFamilyMember"
            style="grid-column: 1 / 3; justify-self: center; text-align: center"
          >
            Add to family
          </button>
        </fieldset>
        <div style="grid-column: 1 / 3; display: flex; flex-direction: column">
          <h3>Family members:</h3>
          <ul>
            <li
              v-for="(member, index) in familyMembersInput"
              :key="`${member.name}`"
            >
              <span>
                {{ member.name }}
                {{ member.is_child_under_14 === `YES` ? "(Child)" : "" }}
                {{ member.deleted ? "DELETED" : "" }}
              </span>
              <button
                v-if="!member.deleted"
                @click="onDeleteFamilyMember(index)"
              >
                Delete
              </button>
              <button v-else @click="onUndeleteFamilyMember(index)">
                Undelete
              </button>
            </li>
          </ul>
        </div>
      </template>
      <label for="accommodationIsProvided">Is accommodation provided?</label>
      <input
        type="checkbox"
        id="accommodationIsProvided"
        v-model="accommodationInput.is_provided"
      />
      <template v-if="accommodationInput.is_provided">
        <label for="accommodationType">Type:</label>
        <select id="accommodationType" v-model="accommodationInput.type">
          <option :value="undefined">--Select--</option>
          <option :value="`SINGLE_BED`">Single Bed</option>
          <option :value="`TWIN_BED`">Twin Bed</option>
        </select>
        <label for="accommodationType">Hotel:</label>
        <select id="accommodationType" v-model="accommodationInput.hotel">
          <option :value="undefined">--Select--</option>
          <option :value="`PENSION`">Pension Oberndorf</option>
          <option :value="`APARTHOTEL`">Aparthotel Donaustern</option>
        </select>
        <label for="accommodationNightsIncluded">Nights included:</label>
        <input
          for="accommodationNightsIncluded"
          type="number"
          min="0"
          v-model="accommodationInput.nights_included"
        />
        <label for="accommodationIsAccepted">Is accommodation accepted?</label>
        <FormChoiceField
          id="accommodationIsAccepted"
          v-model="accommodationInput.is_accepted"
        />
      </template>
    </div>
  </form>
</template>
<script setup lang="ts">
import type { Choice, GuestType } from "@prisma/client";
import FormChoiceField from "~/components/FormChoiceField.vue";
import type { FamilyMemberType, GuestFormType } from "~/components/types";

const props = withDefaults(defineProps<GuestFormType>(), {
  is_coming: `UNDETERMINED`,
  is_invited_to_civil_marriage_day: false,
  accommodation: () => ({}),
  single: () => ({}),
  couple: () => ({}),
  family: () => ({}),
  family_members: () => [],
});
const emit = defineEmits<{ save: [GuestFormType] }>();

const guestTypeInput = ref<GuestType | undefined>(props.guestType);
const isComing = ref<Choice>(props.is_coming);
const invitationCodeInput = ref<string | undefined>(props.invitationCode);
const isInvitedToCivilMarriageDay = ref<boolean>(
  props.is_invited_to_civil_marriage_day
);

const accommodationInput = ref<
  Partial<NonNullable<GuestFormType["accommodation"]>>
>(props.accommodation || {});
const singleInput = ref<Partial<NonNullable<GuestFormType["single"]>>>(
  props.single || {}
);
const coupleInput = ref<Partial<NonNullable<GuestFormType["couple"]>>>(
  props.couple || {}
);
const familyInput = ref<Partial<NonNullable<GuestFormType["family"]>>>(
  props.family || {}
);
const familyMembersInput = ref<FamilyMemberType[]>(props.family_members || []);

const newMemberName = ref<string>();
const newMemberIsChildUnder14 = ref<Choice>();

onMounted(() => {
  onGenerateCode();
});

function onAddFamilyMember() {
  if (!newMemberName.value) return;

  familyMembersInput.value.push({
    name: newMemberName.value,
    is_child_under_14: newMemberIsChildUnder14.value,
    deleted: false,
  });
  newMemberName.value = undefined;
  newMemberIsChildUnder14.value = undefined;
}

function onDeleteFamilyMember(index: number) {
  const member = familyMembersInput.value.at(index);
  if (member) {
    if (member.member_id) member.deleted = true;
    else familyMembersInput.value.splice(index, 1);
  }
}

function onUndeleteFamilyMember(index: number) {
  const member = familyMembersInput.value.at(index);
  if (member) member.deleted = false;
}

function onGenerateCode() {
  invitationCodeInput.value = crypto.randomUUID();
}

const isEmptyObject = <T>(v: T) =>
  Object.keys(v || {}).length === 0 ? undefined : v;
function onSaveChanges() {
  emit("save", {
    guestId: props.guestId,
    guestType: guestTypeInput.value,
    invitationCode: invitationCodeInput.value,
    is_coming: isComing.value,
    is_invited_to_civil_marriage_day: isInvitedToCivilMarriageDay.value,
    accommodation: isEmptyObject(accommodationInput.value),
    single: guestTypeInput.value === "SINGLE" ? singleInput.value : undefined,
    couple: guestTypeInput.value === "COUPLE" ? coupleInput.value : undefined,
    family: guestTypeInput.value === "FAMILY" ? familyInput.value : undefined,
    family_members:
      guestTypeInput.value === "FAMILY" ? familyMembersInput.value : undefined,
  });
}
</script>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 0.5rem;
}
.fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
