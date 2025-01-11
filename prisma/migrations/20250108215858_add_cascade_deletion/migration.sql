-- DropForeignKey
ALTER TABLE "Accommodation" DROP CONSTRAINT "Accommodation_guest_id_fkey";

-- DropForeignKey
ALTER TABLE "Couple" DROP CONSTRAINT "Couple_couple_id_fkey";

-- DropForeignKey
ALTER TABLE "Family" DROP CONSTRAINT "Family_family_id_fkey";

-- DropForeignKey
ALTER TABLE "FamilyMember" DROP CONSTRAINT "FamilyMember_family_id_fkey";

-- AddForeignKey
ALTER TABLE "Couple" ADD CONSTRAINT "Couple_couple_id_fkey" FOREIGN KEY ("couple_id") REFERENCES "Guest"("guest_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_family_id_fkey" FOREIGN KEY ("family_id") REFERENCES "Guest"("guest_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyMember" ADD CONSTRAINT "FamilyMember_family_id_fkey" FOREIGN KEY ("family_id") REFERENCES "Family"("family_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accommodation" ADD CONSTRAINT "Accommodation_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "Guest"("guest_id") ON DELETE CASCADE ON UPDATE CASCADE;
