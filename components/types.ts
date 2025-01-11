import type { AccommodationType, Choice, GuestType } from "@prisma/client";

type FamilyMemberType = Partial<{
  member_id?: number;
  name?: string;
  is_child_under_14?: Choice;
  deleted?: boolean;
}>;

type GuestFormType = {
  guestId?: number;
  guestType?: GuestType;
  invitationCode?: string;
  accommodation?: {
    is_provided?: boolean;
    type?: AccommodationType;
    nights_included?: number;
    is_accepted?: Choice;
  };
  single?: {
    name?: string;
    is_coming?: Choice;
    plus_one?: Choice;
    plus_one_name?: string;
  };
  couple?: {
    partner1_name?: string;
    partner2_name?: string;
    is_coming?: Choice;
  };
  family?: {
    name?: string;
    is_coming?: Choice;
  };
  family_members?: FamilyMemberType[];
};

export type { GuestFormType, FamilyMemberType };
