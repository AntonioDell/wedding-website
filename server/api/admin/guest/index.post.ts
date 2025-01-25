import { useGuestSchema } from "~/server/utils/adminGuestForm";
import { checkAdmin } from "~/server/utils/checkAdmin";
import prisma from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  await checkAdmin(event);

  const { CreateGuestSchema } = useGuestSchema();
  const {
    guestType,
    is_coming,
    is_invited_to_civil_marriage_day,
    invitationCode,
    accommodation,
    single,
    couple,
    family,
    family_members,
  } = await readValidatedBody(event, CreateGuestSchema.parseAsync);

  await prisma.guest.create({
    data: {
      type: guestType,
      is_coming,
      is_invited_to_civil_marriage_day,
      invitation: {
        create: {
          code: invitationCode,
        },
      },
      accommodation: {
        create: {
          hotel: accommodation.hotel,
          is_provided: accommodation.is_provided,
          type: accommodation.is_provided ? accommodation.type : "NO_BED",
          nights_included: accommodation.is_provided
            ? accommodation.nights_included
            : 0,
          is_accepted: accommodation.is_accepted,
        },
      },
      single:
        guestType === "SINGLE" && single
          ? {
              create: {
                name: single.name,
                plus_one: single.plus_one,
                plus_one_name: single.plus_one_name,
              },
            }
          : undefined,
      couple:
        guestType === "COUPLE" && couple
          ? {
              create: {
                partner1_name: couple.partner1_name,
                partner2_name: couple.partner2_name,
              },
            }
          : undefined,
      family:
        guestType === "FAMILY" && family
          ? {
              create: {
                name: family.name,
                family_members: family_members
                  ? {
                      createMany: {
                        data: family_members,
                      },
                    }
                  : undefined,
              },
            }
          : undefined,
    },
  });

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
