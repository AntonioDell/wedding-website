/*
  Warnings:

  - You are about to drop the column `guest_type` on the `Guest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Guest" DROP COLUMN "guest_type",
ADD COLUMN     "type" "GuestType" NOT NULL DEFAULT 'SINGLE';
