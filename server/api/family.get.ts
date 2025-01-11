import { checkCode } from "~/server/utils/checkCode";
import prisma from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const invitation = await checkCode(event);
  const family = await prisma.family.findFirstOrThrow({
    where: { guest: { guest_id: invitation.guest_id } },
    include: { family_members: true },
  });
  return family;
});
