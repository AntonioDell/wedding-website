import prisma from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  if (!query.code)
    throw createError({
      statusCode: 400,
      statusMessage: `Code is required`,
    });

  const invitation = await prisma.invitation.findFirstOrThrow({
    where: { code: query.code.toString() },
    include: { addressee: true },
  });
  if (!invitation)
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid code",
    });

  const { id: weddingId, ...wedding } = await prisma.wedding.findFirstOrThrow();
  if (!invitation.addressee)
    throw createError({
      statusCode: 500,
      statusMessage: `Invitation for code ${invitation.code} doesn't contain addressee.`,
    });
  return {
    ...wedding,
    invitation,
  };
});
