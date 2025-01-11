import { checkCode } from "~/server/utils/checkCode";
import prisma from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const invitation = await checkCode(event);
  const couple = await prisma.couple.findFirstOrThrow({
    where: { guest: { guest_id: invitation.guest_id } },
  });
  return couple;
});
