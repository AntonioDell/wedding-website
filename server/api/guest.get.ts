import { checkCode } from "~/server/utils/checkCode";
import prisma from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const invitation = await checkCode(event);
  const guest = await prisma.guest.findFirstOrThrow({
    where: { invitation: { code: invitation.code } },
  });
  return guest;
});
