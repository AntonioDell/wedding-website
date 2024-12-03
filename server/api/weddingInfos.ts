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

  const { id: weddingId, ...wedding } = await prisma.wedding.findFirstOrThrow({
    include: {
      accomodations: true,
      location: true,
      schedule: { include: { entries: true } },
      theme: true,
    },
  });
  if (
    wedding.accomodations &&
    wedding.location &&
    wedding.schedule &&
    wedding.theme &&
    invitation.addressee
  )
    return {
      ...wedding,
      accomodations: wedding.accomodations,
      location: wedding.location,
      schedule: wedding.schedule,
      theme: wedding.theme,
      addressee: invitation.addressee,
    };

  throw createError({
    statusCode: 500,
    statusMessage: "Wedding is not setup properly",
  });
});
