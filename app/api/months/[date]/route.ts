import { prisma } from "@/lib/prisma";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ date: string }> },
) => {
  const { date } = await params;
  const [month, year] = date.split("-");

  let data = await prisma.monthExpenses.findFirst({
    where: {
      month,
      year,
    },
  });

  if (!data) {
    data = await prisma.monthExpenses.create({
      data: {
        month,
        year,
        income: 0,
        investingPercentage: 0,
        funLimit: 0,
        totalNecessaryExpenses: 0,
        totalFunExpenses: 0,
      },
    });
  } else {
  }

  // TODO - return data
  return Response.json({ data }, { status: 200 });
};

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ date: string }> },
) => {
  const { date } = await params;
  const [month, year] = date.split("-");

  const body = await req.json();

  await prisma.monthExpenses.update({
    where: {
      id: {
        month,
        year,
      },
    },
    data: {
      month,
      year,
      income: body.income,
      investingPercentage: body.investingPercentage,
      funLimit: body.funLimit,
      totalNecessaryExpenses: body.necessaryExpenses,
      totalFunExpenses: body.funExpenses,
    },
  });
};
