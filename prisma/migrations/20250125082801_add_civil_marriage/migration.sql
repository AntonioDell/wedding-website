/*
  Warnings:

  - You are about to drop the column `is_coming` on the `Couple` table. All the data in the column will be lost.
  - You are about to drop the column `is_coming` on the `Family` table. All the data in the column will be lost.
  - You are about to drop the column `is_coming` on the `Single` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Couple" DROP COLUMN "is_coming";

-- AlterTable
ALTER TABLE "Family" DROP COLUMN "is_coming";

-- AlterTable
ALTER TABLE "Guest" ADD COLUMN     "is_coming" "Choice" NOT NULL DEFAULT 'UNDETERMINED',
ADD COLUMN     "is_coming_to_civil_marriage_day" "Choice" NOT NULL DEFAULT 'UNDETERMINED',
ADD COLUMN     "is_invited_to_civil_marriage_day" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Single" DROP COLUMN "is_coming";
