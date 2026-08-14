-- CreateEnum
CREATE TYPE "BigPurchaseMoneyType" AS ENUM ('CONTRIBUTION', 'TRANSACTION');

-- CreateTable
CREATE TABLE "BigPurchaseMoney" (
    "id" SERIAL NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "type" "BigPurchaseMoneyType" NOT NULL,
    "expenseMonth" TEXT NOT NULL,
    "expenseYear" TEXT NOT NULL,

    CONSTRAINT "BigPurchaseMoney_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BigPurchaseMoney" ADD CONSTRAINT "BigPurchaseMoney_expenseMonth_expenseYear_fkey" FOREIGN KEY ("expenseMonth", "expenseYear") REFERENCES "MonthExpenses"("month", "year") ON DELETE RESTRICT ON UPDATE CASCADE;
