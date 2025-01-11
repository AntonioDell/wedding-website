import { type H3Event } from "h3";

export const checkCode = async (event: H3Event) => {
  const code = getHeader(event, "Authorization");
  if (!code)
    throw createError({
      statusCode: 400,
      statusMessage: `Code is required`,
    });
  const invitation = await prisma.invitation.findFirst({
    where: { code },
  });
  if (!invitation)
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid code",
    });
  return invitation;
};
