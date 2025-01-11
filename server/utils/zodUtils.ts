import { Choice } from "@prisma/client";
import { z } from "zod";

export const useZodUtils = () => {
  const mandatoryChoice = z.enum([Choice.YES, Choice.NO]);
  const optionalChoice = z
    .enum([Choice.YES, Choice.NO, Choice.UNDETERMINED])
    .optional();

  return { mandatoryChoice, optionalChoice };
};
