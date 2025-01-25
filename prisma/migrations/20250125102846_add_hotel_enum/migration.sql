-- CreateEnum
CREATE TYPE "Hotel" AS ENUM ('PENSION', 'APARTHOTEL');

-- AlterTable
ALTER TABLE "Accommodation" ADD COLUMN     "hotel" "Hotel" NOT NULL DEFAULT 'PENSION';
