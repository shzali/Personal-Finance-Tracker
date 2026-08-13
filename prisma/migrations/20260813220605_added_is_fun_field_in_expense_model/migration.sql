/*
  Warnings:

  - Added the required column `isFun` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "isFun" BOOLEAN NOT NULL;
