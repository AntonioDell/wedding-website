import { GuestType, AccommodationType, Hotel } from "@prisma/client";
import { z } from "zod";

export const useGuestSchema = () => {
  const { optionalChoice } = useZodUtils();

  const guestTypeEnum = z.enum([
    GuestType.SINGLE,
    GuestType.COUPLE,
    GuestType.FAMILY,
  ]);

  const hotelEnum = z.enum([Hotel.PENSION, Hotel.APARTHOTEL]);

  const accommodationBaseField = z.object({
    is_provided: z.boolean(),
    is_accepted: optionalChoice,
    hotel: hotelEnum.default("PENSION"),
    type: z
      .enum([
        AccommodationType.NO_BED,
        AccommodationType.SINGLE_BED,
        AccommodationType.TWIN_BED,
      ])
      .optional(),
    nights_included: z.number().min(0).optional(),
  });

  const singleField = z.object({
    name: z.string().min(1),
    plus_one: optionalChoice,
    plus_one_name: z.string().min(1).optional(),
  });

  const coupleField = z.object({
    partner1_name: z.string().min(1),
    partner2_name: z.string().min(1),
  });

  const familyMembersField = z.object({
    name: z.string().min(1),
    is_child_under_14: optionalChoice,
  });

  const familyField = z.object({
    name: z.string().min(1),
  });

  const BaseGuestSchema = z.object({
    guestType: guestTypeEnum,
    is_coming: optionalChoice,
    is_invited_to_civil_marriage_day: z.boolean().default(false),
    invitationCode: z.string().min(1),
    accommodation: accommodationBaseField
      .optional()
      .transform((v) => {
        if (v && v.is_provided !== undefined) return v;
        return {
          is_provided: false,
          nights_included: 0,
          type: AccommodationType.NO_BED,
          hotel: "PENSION",
        } satisfies typeof accommodationBaseField._input;
      })
      .refine((value) => {
        if (value.is_provided) {
          return (
            value.nights_included !== undefined &&
            value.nights_included > 0 &&
            value.type &&
            value.type !== "NO_BED"
          );
        } else
          return (
            !value.nights_included && value.type === AccommodationType.NO_BED
          );
      }),
    single: singleField.optional().refine((value) => {
      if (value && value.plus_one === "YES") return !!value.plus_one_name;
      else return true;
    }),
    couple: coupleField.optional(),
    family: familyField.optional(),
    family_members: z
      .array(familyMembersField)
      .optional()
      .transform((v) => (v && v.length === 0 ? undefined : v)),
  });

  const CreateGuestSchema = BaseGuestSchema.extend({
    invitationCode: z
      .string()
      .min(1)
      .refine(async (value) => {
        // Make sure there is no other invitation with that code
        const existingInvitation = await prisma.invitation.findUnique({
          where: {
            code: value,
          },
        });
        return existingInvitation === null;
      }),
  }).superRefine((v, context) => {
    if (v.guestType === "SINGLE" && !v.single) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        fatal: true,
        path: ["single"],
        message: "Guest type SINGLE requires single field filled.",
      });
      return z.NEVER;
    } else if (v.guestType === "COUPLE" && !v.couple) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        fatal: true,
        path: ["couple"],
        message: "Guest type COUPLE requires couple field filled.",
      });
      return z.NEVER;
    } else if (
      v.guestType === "FAMILY" &&
      (!v.family || !v.family_members || v.family_members.length === 0)
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        fatal: true,
        path: ["family"],
        message:
          "Guest type FAMILY requires family field filled and familyMembers to exist.",
      });
      return z.NEVER;
    }
  });

  const PatchGuestSchema = BaseGuestSchema.extend({
    guestId: z
      .number()
      .positive()
      .refine(async (value) => {
        const existingGuest = await prisma.guest.findUnique({
          where: { guest_id: value },
        });
        return existingGuest !== null;
      }),
    guestType: guestTypeEnum.optional(),
    is_coming: optionalChoice,
    is_coming_to_civil_marriage_day: optionalChoice,
    invitationCode: z.string().min(1).optional(),
    accommodation: accommodationBaseField
      .extend({
        is_provided: z.boolean().optional(),
      })
      .refine((value) => {
        if (value.is_provided) {
          return (
            value.nights_included !== undefined &&
            value.nights_included > 0 &&
            value.type &&
            value.type !== "NO_BED"
          );
        } else return !value.nights_included && value.type === "NO_BED";
      }),
    single: singleField
      .extend({
        name: z.string().min(1).optional(),
      })
      .optional()
      .refine((value) => {
        if (value && value.plus_one === "YES") return !!value.plus_one_name;
        else return true;
      }),
    couple: coupleField.optional(),
    family: familyField.optional(),
    family_members: z
      .array(
        familyMembersField.extend({
          member_id: z.number().positive().optional(),
          deleted: z.boolean().default(false).optional(),
        })
      )
      .optional(),
  }).superRefine((v, context) => {
    if (v.guestType === "SINGLE" && !v.single) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        fatal: true,
        path: ["single"],
        message: "Guest type SINGLE requires single field filled.",
      });
      return z.NEVER;
    } else if (v.guestType === "COUPLE" && !v.couple) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        fatal: true,
        path: ["couple"],
        message: "Guest type COUPLE requires couple field filled.",
      });
      return z.NEVER;
    } else if (
      v.guestType === "FAMILY" &&
      (!v.family || !v.family_members || v.family_members.length === 0)
    ) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        fatal: true,
        path: ["family"],
        message:
          "Guest type FAMILY requires family field filled and familyMembers to exist.",
      });
      return z.NEVER;
    }
  });

  return { CreateGuestSchema, PatchGuestSchema, familyMembersField };
};
