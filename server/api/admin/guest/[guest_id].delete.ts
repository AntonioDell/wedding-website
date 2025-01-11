import { z } from "zod";
import { checkAdmin } from "~/server/utils/checkAdmin";
import prisma from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  await checkAdmin(event);

  const DeleteGuestSchema = z.object({
    guest_id: z.coerce.number().refine(async (value) => {
      // Make sure there is a guest to delete
      const guestToDelete = await prisma.guest.findUnique({
        where: { guest_id: value },
      });
      return guestToDelete !== null;
    }),
  });

  const { guest_id } = await getValidatedRouterParams(
    event,
    DeleteGuestSchema.parseAsync
  );
  await prisma.guest.delete({
    where: { guest_id },
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
