import type {
  AccommodationType,
  Choice,
  GuestType,
  Hotel,
} from "@prisma/client";

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
  is_coming?: Choice;
  is_invited_to_civil_marriage_day?: boolean;
  is_coming_to_civil_marriage_day?: Choice;
  accommodation?: {
    is_provided?: boolean;
    type?: AccommodationType;
    nights_included?: number;
    is_accepted?: Choice;
    hotel?: Hotel;
  };
  single?: {
    name?: string;
    plus_one?: Choice;
    plus_one_name?: string;
  };
  couple?: {
    partner1_name?: string;
    partner2_name?: string;
  };
  family?: {
    name?: string;
  };
  family_members?: FamilyMemberType[];
};

export type { FamilyMemberType, GuestFormType };
