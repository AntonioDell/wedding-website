/*
  Warnings:

  - You are about to drop the column `partner1_is_coming` on the `Couple` table. All the data in the column will be lost.
  - You are about to drop the column `partner2_is_coming` on the `Couple` table. All the data in the column will be lost.
  - The `plus_one` column on the `Single` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `partner1_name` to the `Couple` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partner2_name` to the `Couple` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Family` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Accommodation" ADD COLUMN     "is_accepted" "Choice" NOT NULL DEFAULT 'UNDETERMINED';

-- AlterTable
ALTER TABLE "Couple" DROP COLUMN "partner1_is_coming",
DROP COLUMN "partner2_is_coming",
ADD COLUMN     "is_coming" "Choice" NOT NULL DEFAULT 'UNDETERMINED',
ADD COLUMN     "partner1_name" TEXT NOT NULL,
ADD COLUMN     "partner2_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Family" ADD COLUMN     "is_coming" "Choice" NOT NULL DEFAULT 'UNDETERMINED',
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Single" DROP COLUMN "plus_one",
ADD COLUMN     "plus_one" "Choice" NOT NULL DEFAULT 'UNDETERMINED';
