/*
  Warnings:

  - The primary key for the `Invitation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Invitation` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "AdresseeType" AS ENUM ('SINGLE', 'COUPLE', 'FAMILY');

-- AlterTable
ALTER TABLE "Invitation" DROP CONSTRAINT "Invitation_pkey",
DROP COLUMN "id",
ADD COLUMN     "status" "InvitationStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "code" DROP DEFAULT,
ADD CONSTRAINT "Invitation_pkey" PRIMARY KEY ("code");

-- CreateTable
CREATE TABLE "Addressee" (
    "name" TEXT NOT NULL,
    "type" "AdresseeType" NOT NULL DEFAULT 'SINGLE',
    "invitationCode" TEXT NOT NULL,

    CONSTRAINT "Addressee_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Wedding" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "husbandToBe" TEXT NOT NULL,
    "wifeToBe" TEXT NOT NULL,
    "themeName" TEXT,

    CONSTRAINT "Wedding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Theme" (
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weddingId" INTEGER NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Location" (
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "weddingId" INTEGER NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accomodation" (
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "weddingId" INTEGER,

    CONSTRAINT "Accomodation_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "Addressee_invitationCode_key" ON "Addressee"("invitationCode");

-- CreateIndex
CREATE UNIQUE INDEX "Theme_weddingId_key" ON "Theme"("weddingId");

-- CreateIndex
CREATE UNIQUE INDEX "Location_weddingId_key" ON "Location"("weddingId");

-- AddForeignKey
ALTER TABLE "Addressee" ADD CONSTRAINT "Addressee_invitationCode_fkey" FOREIGN KEY ("invitationCode") REFERENCES "Invitation"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Theme" ADD CONSTRAINT "Theme_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accomodation" ADD CONSTRAINT "Accomodation_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE SET NULL ON UPDATE CASCADE;
