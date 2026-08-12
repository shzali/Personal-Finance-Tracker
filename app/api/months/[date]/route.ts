import { prisma } from "@/lib/prisma";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ date: string }> },
) => {
  const { date } = await params;
  const [month, year] = date.split("-");

  console.log("TRYING TO FETCH DATA ...");
  let data = await prisma.month.findFirst({
    where: {
      month,
      year,
    },
  });

  if (!data) {
    console.log("DATA NOT FOUND. CREATING DATA ...");
    data = await prisma.month.create({
      data: {
        month,
        year,
        income: "0",
        investingPercentageOverride: 0,
        recreationalLimitOverride: 0,
        totalNecessaryExpenses: 0,
        totalRecreationalExpenses: 0,
        expensesSpillover: 0,
      },
    });
  } else {
    console.log("DATA FOUND");
  }

  console.log(data);
};
