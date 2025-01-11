-- DropForeignKey
ALTER TABLE "Single" DROP CONSTRAINT "Single_single_id_fkey";

-- AddForeignKey
ALTER TABLE "Single" ADD CONSTRAINT "Single_single_id_fkey" FOREIGN KEY ("single_id") REFERENCES "Guest"("guest_id") ON DELETE CASCADE ON UPDATE CASCADE;
