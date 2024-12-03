/*
  Warnings:

  - The `type` column on the `Addressee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `themeName` on the `Wedding` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[weddingId]` on the table `Schedule` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `weddingId` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AddresseeType" AS ENUM ('SINGLE', 'COUPLE', 'FAMILY');

-- AlterTable
ALTER TABLE "Addressee" DROP COLUMN "type",
ADD COLUMN     "type" "AddresseeType" NOT NULL DEFAULT 'SINGLE';

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "weddingId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Wedding" DROP COLUMN "themeName";

-- DropEnum
DROP TYPE "AdresseeType";

-- CreateTable
CREATE TABLE "ScheduleEntry" (
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "scheduleId" INTEGER,

    CONSTRAINT "ScheduleEntry_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "Schedule_weddingId_key" ON "Schedule"("weddingId");

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduleEntry" ADD CONSTRAINT "ScheduleEntry_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
