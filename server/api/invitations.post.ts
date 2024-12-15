import { InvitationStatus } from "@prisma/client";
import { z } from "zod";
import prisma from "~/server/utils/prisma";

const invitationsPostPayload = z.object({
  code: z.string().trim().nonempty({ message: "Code is required" }),
  status: z.enum([
    InvitationStatus.ACCEPTED,
    InvitationStatus.REJECTED,
  ] as const),
});

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(
    event,
    invitationsPostPayload.safeParse
  );
  if (!result.success)
    throw createError({
      statusCode: 400,
      statusMessage: result.error.message,
    });

  const { code, status } = result.data;
  return await prisma.invitation.update({
    where: { code },
    data: {
      status,
    },
  });
});
