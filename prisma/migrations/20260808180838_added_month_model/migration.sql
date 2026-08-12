-- CreateTable
CREATE TABLE "Month" (
    "id" SERIAL NOT NULL,
    "monthName" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "income" TEXT NOT NULL,
    "investingPercentageOverride" INTEGER,
    "recreationalLimitOverride" INTEGER NOT NULL,
    "totalNecessaryExpenses" INTEGER NOT NULL,
    "totalRecreationalExpenses" INTEGER NOT NULL,
    "expensesSpillover" INTEGER NOT NULL,

    CONSTRAINT "Month_pkey" PRIMARY KEY ("id")
);
