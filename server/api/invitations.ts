import prisma from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  if (!query.code)
    throw createError({
      statusCode: 400,
      statusMessage: `Code is required`,
    });
  const invitation = await prisma.invitation.findFirst({
    where: { code: query.code.toString() },
  });
  if (!invitation)
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid code",
    });

  return invitation;
});
