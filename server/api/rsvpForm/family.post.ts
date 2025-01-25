import { checkCode } from "~/server/utils/checkCode";
import prisma from "~/server/utils/prisma";
import { useRsvpForm } from "~/composables/rsvpForm";

export default defineEventHandler(async (event) => {
  const { guest_id } = await checkCode(event);

  const { RsvpFormFamilySchema } = useRsvpForm();
  const { is_coming, is_coming_to_civil_marriage_day } =
    await readValidatedBody(event, RsvpFormFamilySchema.parse);

  const transactions: any[] = [
    prisma.guest.update({
      where: { guest_id },
      data: {
        is_coming,
        is_coming_to_civil_marriage_day,
      },
    }),
  ];

  await prisma.$transaction(transactions);
});
