-- CreateEnum
CREATE TYPE "AccommodationType" AS ENUM ('TWIN_BED', 'SINGLE_BED');

-- AlterTable
ALTER TABLE "Invitation" ADD COLUMN     "accommodationType" "AccommodationType" NOT NULL DEFAULT 'TWIN_BED';
