import { checkCode } from "~/server/utils/checkCode";
import prisma from "~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  await checkCode(event);
  const wedding = await prisma.wedding.findFirstOrThrow();
  return wedding;
});
