import { z } from "zod";

export const useRsvpForm = (isAccommodationProvided: boolean = false) => {
  const { mandatoryChoice, optionalChoice } = useZodUtils();
  const RsvpFormSingleSchema = z
    .object({
      is_coming: mandatoryChoice,
      plus_one: mandatoryChoice,
      plus_one_name: z.string().min(1).optional(),
      is_accommodation_accepted: isAccommodationProvided
        ? mandatoryChoice
        : optionalChoice,
    })
    .refine(
      (v) => {
        if (v.is_coming && v.plus_one === "YES") {
          return v.plus_one_name !== undefined;
        }
        return true;
      },
      {
        message: "plus_one_name is mandatory, when plus_one is 'YES'.",
        path: ["plus_one_name"],
      }
    );

  const RsvpFormCoupleSchema = z.object({
    is_coming: mandatoryChoice,
    is_accommodation_accepted: isAccommodationProvided
      ? mandatoryChoice
      : optionalChoice,
  });
  const RsvpFormFamilySchema = z.object({
    is_coming: mandatoryChoice,
  });
  return { RsvpFormSingleSchema, RsvpFormCoupleSchema, RsvpFormFamilySchema };
};
