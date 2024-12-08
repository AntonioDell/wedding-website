/*
  Warnings:

  - You are about to drop the `Accomodation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Schedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ScheduleEntry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Theme` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Accomodation" DROP CONSTRAINT "Accomodation_weddingId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_weddingId_fkey";

-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_weddingId_fkey";

-- DropForeignKey
ALTER TABLE "ScheduleEntry" DROP CONSTRAINT "ScheduleEntry_scheduleDate_fkey";

-- DropForeignKey
ALTER TABLE "Theme" DROP CONSTRAINT "Theme_weddingId_fkey";

-- AlterTable
ALTER TABLE "Wedding" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Accomodation";

-- DropTable
DROP TABLE "Location";

-- DropTable
DROP TABLE "Schedule";

-- DropTable
DROP TABLE "ScheduleEntry";

-- DropTable
DROP TABLE "Theme";
