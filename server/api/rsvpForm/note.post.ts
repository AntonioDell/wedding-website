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

  const { NoteFormSchema } = useRsvpForm();
  const { note } = await readValidatedBody(event, NoteFormSchema.parse);

  const transactions: any[] = [
    prisma.guest.update({
      where: { guest_id },
      data: {
        note,
      },
    }),
  ];

  await prisma.$transaction(transactions);
});
