-- AlterTable
ALTER TABLE "Invitation" ADD COLUMN     "accommodationNights" SMALLINT NOT NULL DEFAULT 0,
ADD COLUMN     "accommodationProvided" BOOLEAN NOT NULL DEFAULT false;
