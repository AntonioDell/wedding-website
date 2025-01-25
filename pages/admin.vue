<template>
  <div>
    <div
      style="margin: 1rem; display: flex; flex-direction: column"
      v-if="allGuests"
    >
      <h1>Admin Page</h1>
      <template v-if="guestToEdit">
        <button @click="guestToEdit = undefined">Cancel guest editing</button>
        <div
          style="
            border: 2px solid white;
            margin: 1rem;
            background-color: var(--dark-purple);
          "
        >
          <h2>Edit Guest Form</h2>
          <GuestForm
            @save="onEditGuestSave"
            :guest-type="guestToEdit.type"
            :guest-id="guestToEdit.guest_id"
            :is-coming="guestToEdit.is_coming"
            :single="guestToEdit.single"
            :couple="guestToEdit.couple"
            :family="guestToEditFamily"
            :family_members="guestToEditFamilyMMembers"
            :invitation-code="guestToEdit.invitation.code"
            :accommodation="guestToEdit.accommodation"
            style="padding: 1rem"
          />
        </div>
      </template>
      <div v-else>
        <button v-if="!showAddGuestForm" @click="showAddGuestForm = true">
          Add guest
        </button>
        <button v-else @click="showAddGuestForm = false">
          Cancel guest creation
        </button>
        <template v-if="showAddGuestForm">
          <div
            style="
              border: 2px solid white;
              margin: 1rem;
              background-color: var(--dark-purple);
            "
          >
            <h2>Add Guest Form</h2>
            <GuestForm @save="onAddGuestSave" style="padding: 1rem" />
          </div>
        </template>
      </div>
      <table style="background-color: black">
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Is coming?</th>
            <th>Accommodation</th>
            <th>Additonal people</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="guest in allGuests" :key="guest.guest_id">
            <td>
              <template v-if="guest.type === `SINGLE`">
                <span>{{ guest.single.name }}</span>
              </template>
              <template v-else-if="guest.type === `COUPLE`">
                <span
                  >{{ guest.couple.partner1_name }} and
                  {{ guest.couple.partner2_name }}
                </span>
              </template>
              <template v-else>
                <span>{{ guest.family.name }}</span>
              </template>
            </td>
            <td>
              <a :href="`/?code=${guest.invitation.code}`" target="_blank">{{
                guest.invitation.code
              }}</a>
            </td>
            <td style="text-align: left">
              <span>Hochzeit: {{ guest.is_coming }}</span
              ><br />
              <span
                >Standesamt:
                {{
                  guest.is_invited_to_civil_marriage_day
                    ? guest.is_coming_to_civil_marriage_day
                    : "-"
                }}</span
              >
            </td>
            <td>
              {{
                guest.accommodation.is_provided
                  ? `Accepted (${guest.accommodation.type}, ${guest.accommodation.nights_included} nights): ${guest.accommodation.is_accepted}`
                  : "-"
              }}
            </td>
            <td>
              <template v-if="guest.type === `SINGLE`">
                <span>{{
                  guest.single.plus_one === `YES`
                    ? guest.single.plus_one_name
                    : "-"
                }}</span>
              </template>
              <template v-else-if="guest.type === `FAMILY`">
                <div>
                  <span>Family members:</span>
                  <ul>
                    <li
                      v-for="member in guest.family.family_members"
                      :key="member.member_id"
                    >
                      {{ member.name }}
                      {{
                        member.is_child_under_14 === "YES"
                          ? "(< 14 years old)"
                          : ""
                      }}
                    </li>
                  </ul>
                </div>
              </template>
            </td>
            <td>
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  gap: 0.5rem;
                  align-items: center;
                "
              >
                <button @click="guestToEdit = guest">Edit</button>
                <button @click="onDeleteGuest(guest.guest_id)">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>You are not admin.</div>
  </div>
</template>
<script setup lang="ts">
import type { GuestFormType } from "~/components/types";
import { FetchError } from "ofetch";
import { clean } from "deep-cleaner";

const showAddGuestForm = ref<boolean>(false);

const allGuests = ref<any[]>();
const guestToEdit = ref<any>();

const guestToEditFamily = computed(() => {
  if (!guestToEdit.value || guestToEdit.value.type !== "FAMILY")
    return undefined;
  const { family_members, ...family } = guestToEdit.value.family;
  return family;
});

const guestToEditFamilyMMembers = computed(() => {
  if (!guestToEdit.value || guestToEdit.value.type !== "FAMILY")
    return undefined;
  const { family_members, ...family } = guestToEdit.value.family;
  return family_members;
});
const { invitationCode } = useAuth();

const route = useRoute();
const { $authenticatedFetch } = useNuxtApp();

watch(guestToEdit, (newValue, oldValue) => {
  if (oldValue === undefined && newValue) showAddGuestForm.value = false;
});

onMounted(async () => {
  const code =
    (route.query.code as string) || invitationCode.value || undefined;
  invitationCode.value = code;
  try {
    const resp = await $authenticatedFetch("/api/admin/guest/all");
    allGuests.value = resp;
  } catch (e: any) {
    if (e instanceof FetchError && e.statusCode === 401) {
      allGuests.value = undefined;
    }
  }
});

async function onAddGuestSave(guestToAdd: GuestFormType) {
  const resp = await $authenticatedFetch("/api/admin/guest", {
    method: "POST",
    body: clean(guestToAdd),
  });
  allGuests.value = resp;

  showAddGuestForm.value = false;
}

async function onEditGuestSave(guest: GuestFormType) {
  const resp = await $authenticatedFetch("/api/admin/guest", {
    method: "PATCH",
    body: clean(guest),
  });
  allGuests.value = resp;

  guestToEdit.value = undefined;
}
async function onDeleteGuest(guestId: number) {
  const resp = await $authenticatedFetch(`/api/admin/guest/${guestId}`, {
    method: "DELETE",
  });
  allGuests.value = resp;
  if (guestToEdit.value && guestToEdit.value.guest_id === guestId)
    guestToEdit.value = undefined;
}
</script>
<style scoped>
h1,
h2 {
  text-align: center;
}
table,
th,
td {
  border: 1px solid white;
  text-align: center;
}
td,
th {
  padding: 0.3rem;
}
</style>
