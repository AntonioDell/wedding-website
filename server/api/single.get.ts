import { checkCode } from "~/server/utils/checkCode";
import prisma from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const invitation = await checkCode(event);
  const single = await prisma.single.findFirstOrThrow({
    where: { guest: { guest_id: invitation.guest_id } },
  });
  return single;
});
