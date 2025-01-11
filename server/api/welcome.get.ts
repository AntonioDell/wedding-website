import { checkCode } from "~/server/utils/checkCode";
import prisma from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const invitation = await checkCode(event);

  const guest = await prisma.guest.findFirstOrThrow({
    where: { guest_id: invitation.guest_id },
  });
  const accommodation = await prisma.accommodation.findFirstOrThrow({
    where: { guest_id: guest.guest_id },
  });
  const wedding = await prisma.wedding.findFirstOrThrow();
  return { wedding, guest, invitation, accommodation };
});
