import { checkAdmin } from "~/server/utils/checkAdmin";
import prisma from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  await checkAdmin(event);

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
