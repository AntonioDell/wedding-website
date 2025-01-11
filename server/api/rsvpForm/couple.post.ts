import { checkCode } from "~/server/utils/checkCode";
import prisma from "~/server/utils/prisma";
import { useRsvpForm } from "~/composables/rsvpForm";

export default defineEventHandler(async (event) => {
  const { guest_id } = await checkCode(event);
  const accommodation = await prisma.accommodation.findUniqueOrThrow({
    where: {
      guest_id,
    },
    select: { is_provided: true },
  });

  const { RsvpFormCoupleSchema } = useRsvpForm(accommodation.is_provided);
  const { is_coming, is_accommodation_accepted } = await readValidatedBody(
    event,
    RsvpFormCoupleSchema.parse
  );

  const transactions: any[] = [
    prisma.couple.update({
      where: { couple_id: guest_id },
      data: {
        is_coming,
      },
    }),
  ];
  if (accommodation.is_provided) {
    transactions.push(
      prisma.accommodation.update({
        where: { guest_id },
        data: {
          is_accepted: is_accommodation_accepted,
        },
      })
    );
  }

  await prisma.$transaction(transactions);
});
