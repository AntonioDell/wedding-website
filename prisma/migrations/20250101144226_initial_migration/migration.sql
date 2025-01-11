-- CreateEnum
CREATE TYPE "AccommodationType" AS ENUM ('TWIN_BED', 'SINGLE_BED', 'NO_BED');

-- CreateEnum
CREATE TYPE "GuestType" AS ENUM ('SINGLE', 'COUPLE', 'FAMILY');

-- CreateEnum
CREATE TYPE "Choice" AS ENUM ('UNDETERMINED', 'YES', 'NO');

-- CreateTable
CREATE TABLE "Wedding" (
    "id" SERIAL NOT NULL,
    "husbandToBe" TEXT NOT NULL,
    "wifeToBe" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Wedding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guest" (
    "guest_id" SERIAL NOT NULL,
    "guest_type" "GuestType" NOT NULL DEFAULT 'SINGLE',

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("guest_id")
);

-- CreateTable
CREATE TABLE "Single" (
    "single_id" INTEGER NOT NULL,
    "is_coming" "Choice" NOT NULL DEFAULT 'UNDETERMINED',
    "name" TEXT NOT NULL,
    "plus_one" BOOLEAN,
    "plus_one_name" TEXT,

    CONSTRAINT "Single_pkey" PRIMARY KEY ("single_id")
);

-- CreateTable
CREATE TABLE "Couple" (
    "couple_id" INTEGER NOT NULL,
    "partner1_is_coming" "Choice" NOT NULL DEFAULT 'UNDETERMINED',
    "partner2_is_coming" "Choice" NOT NULL DEFAULT 'UNDETERMINED',

    CONSTRAINT "Couple_pkey" PRIMARY KEY ("couple_id")
);

-- CreateTable
CREATE TABLE "Family" (
    "family_id" INTEGER NOT NULL,

    CONSTRAINT "Family_pkey" PRIMARY KEY ("family_id")
);

-- CreateTable
CREATE TABLE "FamilyMember" (
    "member_id" SERIAL NOT NULL,
    "family_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "is_coming" "Choice" NOT NULL DEFAULT 'UNDETERMINED',
    "is_child_under_14" "Choice" NOT NULL DEFAULT 'UNDETERMINED',

    CONSTRAINT "FamilyMember_pkey" PRIMARY KEY ("member_id")
);

-- CreateTable
CREATE TABLE "Invitation" (
    "invitation_id" SERIAL NOT NULL,
    "guest_id" INTEGER NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("invitation_id")
);

-- CreateTable
CREATE TABLE "Accommodation" (
    "accommodation_id" SERIAL NOT NULL,
    "guest_id" INTEGER NOT NULL,
    "is_provided" BOOLEAN NOT NULL DEFAULT false,
    "type" "AccommodationType" NOT NULL DEFAULT 'NO_BED',
    "nights_included" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "Accommodation_pkey" PRIMARY KEY ("accommodation_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_guest_id_key" ON "Invitation"("guest_id");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_code_key" ON "Invitation"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Accommodation_guest_id_key" ON "Accommodation"("guest_id");

-- AddForeignKey
ALTER TABLE "Single" ADD CONSTRAINT "Single_single_id_fkey" FOREIGN KEY ("single_id") REFERENCES "Guest"("guest_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Couple" ADD CONSTRAINT "Couple_couple_id_fkey" FOREIGN KEY ("couple_id") REFERENCES "Guest"("guest_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Family" ADD CONSTRAINT "Family_family_id_fkey" FOREIGN KEY ("family_id") REFERENCES "Guest"("guest_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyMember" ADD CONSTRAINT "FamilyMember_family_id_fkey" FOREIGN KEY ("family_id") REFERENCES "Family"("family_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "Guest"("guest_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accommodation" ADD CONSTRAINT "Accommodation_guest_id_fkey" FOREIGN KEY ("guest_id") REFERENCES "Guest"("guest_id") ON DELETE RESTRICT ON UPDATE CASCADE;
