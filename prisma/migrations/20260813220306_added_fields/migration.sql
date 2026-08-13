/*
  Warnings:

  - You are about to drop the `Month` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Month";

-- CreateTable
CREATE TABLE "MonthExpenses" (
    "month" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "income" INTEGER NOT NULL,
    "investingPercentage" INTEGER NOT NULL,
    "funLimit" INTEGER NOT NULL,
    "totalNecessaryExpenses" INTEGER NOT NULL,
    "totalFunExpenses" INTEGER NOT NULL,

    CONSTRAINT "MonthExpenses_pkey" PRIMARY KEY ("month","year")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "expenseMonth" TEXT NOT NULL,
    "expenseYear" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_expenseMonth_expenseYear_fkey" FOREIGN KEY ("expenseMonth", "expenseYear") REFERENCES "MonthExpenses"("month", "year") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
