/*
  Warnings:

  - Changed the type of `income` on the `Month` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Month" DROP COLUMN "income",
ADD COLUMN     "income" INTEGER NOT NULL;
