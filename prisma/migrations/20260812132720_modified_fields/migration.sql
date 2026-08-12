/*
  Warnings:

  - You are about to drop the column `expensesSpillover` on the `Month` table. All the data in the column will be lost.
  - You are about to drop the column `investingPercentageOverride` on the `Month` table. All the data in the column will be lost.
  - You are about to drop the column `recreationalLimitOverride` on the `Month` table. All the data in the column will be lost.
  - You are about to drop the column `totalRecreationalExpenses` on the `Month` table. All the data in the column will be lost.
  - Added the required column `funExpensesSpillover` to the `Month` table without a default value. This is not possible if the table is not empty.
  - Added the required column `funLimit` to the `Month` table without a default value. This is not possible if the table is not empty.
  - Added the required column `investingPercentage` to the `Month` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalFunExpenses` to the `Month` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Month" DROP COLUMN "expensesSpillover",
DROP COLUMN "investingPercentageOverride",
DROP COLUMN "recreationalLimitOverride",
DROP COLUMN "totalRecreationalExpenses",
ADD COLUMN     "funExpensesSpillover" INTEGER NOT NULL,
ADD COLUMN     "funLimit" INTEGER NOT NULL,
ADD COLUMN     "investingPercentage" INTEGER NOT NULL,
ADD COLUMN     "totalFunExpenses" INTEGER NOT NULL;
