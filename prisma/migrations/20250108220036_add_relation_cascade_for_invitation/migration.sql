-- DropForeignKey
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_guest_id_fkey";

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "Guest"("guest_id") ON DELETE CASCADE ON UPDATE CASCADE;
