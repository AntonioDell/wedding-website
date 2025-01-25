import { z } from "zod";

export const useRsvpForm = (isAccommodationProvided: boolean = false) => {
  const { mandatoryChoice, optionalChoice } = useZodUtils();
  const RsvpFormSingleSchema = z
    .object({
      is_coming: mandatoryChoice,
      is_coming_to_civil_marriage_day: optionalChoice,
      plus_one: optionalChoice,
      plus_one_name: z.string().optional().nullable(),
      is_accommodation_accepted: isAccommodationProvided
        ? mandatoryChoice
        : optionalChoice,
    })
    .refine(
      (v) => {
        if (v.is_coming && v.plus_one === "YES") {
          return v.plus_one_name && v.plus_one_name.length > 1;
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
    is_coming_to_civil_marriage_day: optionalChoice,
    is_accommodation_accepted: isAccommodationProvided
      ? mandatoryChoice
      : optionalChoice,
  });
  const RsvpFormFamilySchema = z.object({
    is_coming: mandatoryChoice,
    is_coming_to_civil_marriage_day: optionalChoice,
  });
  return { RsvpFormSingleSchema, RsvpFormCoupleSchema, RsvpFormFamilySchema };
};
