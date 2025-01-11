import { checkCode } from "~/server/utils/checkCode";

export default defineEventHandler(async (event) => {
  return await checkCode(event);
});
