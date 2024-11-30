/*
  Warnings:

  - A unique constraint covering the columns `[weddingId]` on the table `Accomodation` will be added. If there are existing duplicate values, this will fail.
  - Made the column `weddingId` on table `Accomodation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Accomodation" DROP CONSTRAINT "Accomodation_weddingId_fkey";

-- AlterTable
ALTER TABLE "Accomodation" ALTER COLUMN "weddingId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Accomodation_weddingId_key" ON "Accomodation"("weddingId");

-- AddForeignKey
ALTER TABLE "Accomodation" ADD CONSTRAINT "Accomodation_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
