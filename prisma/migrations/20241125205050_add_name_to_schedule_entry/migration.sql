/*
  Warnings:

  - Added the required column `name` to the `ScheduleEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ScheduleEntry" ADD COLUMN     "name" TEXT NOT NULL;
