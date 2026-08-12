/*
  Warnings:

  - The primary key for the `Month` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Month` table. All the data in the column will be lost.
  - You are about to drop the column `monthName` on the `Month` table. All the data in the column will be lost.
  - Added the required column `month` to the `Month` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Month" DROP CONSTRAINT "Month_pkey",
DROP COLUMN "id",
DROP COLUMN "monthName",
ADD COLUMN     "month" TEXT NOT NULL,
ADD CONSTRAINT "Month_pkey" PRIMARY KEY ("month", "year");
