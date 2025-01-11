import { H3Event } from "h3";

export const checkAdmin = async (event: H3Event) => {
  const code = getHeader(event, "Authorization");
  if (!code)
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid code",
    });
  const admin = await prisma.admin.findUnique({ where: { code } });
  if (!admin)
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid code",
    });
};
