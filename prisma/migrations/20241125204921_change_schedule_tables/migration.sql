/*
  Warnings:

  - The primary key for the `Schedule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Schedule` table. All the data in the column will be lost.
  - The primary key for the `ScheduleEntry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `ScheduleEntry` table. All the data in the column will be lost.
  - You are about to drop the column `scheduleId` on the `ScheduleEntry` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Wedding` table. All the data in the column will be lost.
  - Added the required column `date` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `ScheduleEntry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ScheduleEntry" DROP CONSTRAINT "ScheduleEntry_scheduleId_fkey";

-- AlterTable
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_pkey",
DROP COLUMN "id",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Schedule_pkey" PRIMARY KEY ("date");

-- AlterTable
ALTER TABLE "ScheduleEntry" DROP CONSTRAINT "ScheduleEntry_pkey",
DROP COLUMN "name",
DROP COLUMN "scheduleId",
ADD COLUMN     "scheduleDate" TIMESTAMP(3),
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "ScheduleEntry_pkey" PRIMARY KEY ("time");

-- AlterTable
ALTER TABLE "Wedding" DROP COLUMN "date";

-- AddForeignKey
ALTER TABLE "ScheduleEntry" ADD CONSTRAINT "ScheduleEntry_scheduleDate_fkey" FOREIGN KEY ("scheduleDate") REFERENCES "Schedule"("date") ON DELETE SET NULL ON UPDATE CASCADE;
