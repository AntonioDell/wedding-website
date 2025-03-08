import { useGuestSchema } from "~/server/utils/adminGuestForm";
import { checkAdmin } from "~/server/utils/checkAdmin";
import prisma from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  await checkAdmin(event);

  const { PatchGuestSchema } = useGuestSchema();
  const {
    guestId,
    is_coming,
    is_invited_to_civil_marriage_day,
    is_coming_to_civil_marriage_day,
    guestType,
    invitationCode,
    accommodation,
    single,
    couple,
    family,
    family_members,
  } = await readValidatedBody(event, PatchGuestSchema.parseAsync);

  const transactions = [];
  transactions.push(
    prisma.guest.update({
      where: { guest_id: guestId },
      data: {
        type: guestType,
        is_coming,
        is_invited_to_civil_marriage_day,
        is_coming_to_civil_marriage_day,
        invitation: invitationCode
          ? { update: { code: invitationCode } }
          : undefined,
        accommodation: accommodation ? { update: accommodation } : undefined,
        single: single ? { update: single } : undefined,
        couple: couple ? { update: couple } : undefined,
        family: family
          ? {
              update: family,
            }
          : undefined,
      },
    })
  );
  if (family && family_members && family_members.length > 0) {
    const membersToDelete = family_members.filter(
      (m) => m.member_id && m.deleted
    );
    const membersToCreate = family_members.filter((m) => !m.member_id);
    const membersToUpdate = family_members.filter(
      (m) => m.member_id && !m.deleted
    );
    const _family = await prisma.family.findFirstOrThrow({
      where: { guest: { is: { guest_id: guestId } } },
      include: { guest: true },
    });
    transactions.push(
      prisma.familyMember.deleteMany({
        where: {
          family_id: _family.family_id,
          member_id: { in: membersToDelete.map((m) => m.member_id!) },
        },
      })
    );
    transactions.push(
      prisma.familyMember.createMany({
        data: membersToCreate.map(({ deleted, ...m }) => ({
          ...m,
          family_id: _family.family_id,
        })),
      })
    );
    for (const member of membersToUpdate) {
      const { deleted, ...data } = member;
      transactions.push(
        prisma.familyMember.update({
          where: { member_id: member.member_id! },
          data,
        })
      );
    }
  }

  await prisma.$transaction(transactions);

  return prisma.guest.findMany({
    include: {
      accommodation: true,
      invitation: true,
      single: true,
      couple: true,
      family: {
        include: {
          family_members: true,
        },
      },
    },
    orderBy: { guest_id: "asc" },
  });
});
