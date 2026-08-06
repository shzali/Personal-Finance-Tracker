"use client";

import { useParams } from "next/navigation";

const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

const MonthExpenses = () => {
  const params = useParams<{ month: string }>();
  console.log(params.month);

  return (
    <>
      {MONTHS.includes(params.month.toLowerCase()) ? (
        <p>Hello</p>
      ) : (
        <p>Invalid</p>
      )}
    </>
  );
};

export default MonthExpenses;
