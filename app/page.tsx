// Extract to its own component
"use client";

import Image from "next/image";
import { useState } from "react";

interface ratio {
  investings: number;
  savings: number;
}

export default function Home() {
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<number[]>([]);
  const [ratio, setRatio] = useState<ratio>({ investings: 0.5, savings: 0.5 });
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleChange = (newVal: string, index: number) => {
    if (parseInt(newVal)) {
      const newExpenses = [...expenses];
      newExpenses[index] = Number(newVal);
      setExpenses(newExpenses);
    }
  };

  // Return the sum of all expenses
  const getTotalExpenses = () => {
    return [...expenses].reduce((total, current) => total + current, 0);
  };

  const changeRatios = (newVal: string) => {
    // if (parseInt(newVal)) {
    setRatio({
      investings: parseFloat(newVal),
      savings: 100 - parseFloat(newVal),
    });
    // }
  };

  const getPercentages = () => {
    setErrorMsg("");
    const totalExpenses = getTotalExpenses();
    if (totalExpenses > income) {
      setErrorMsg("Income cannot be less than total expenses");
    }
  };

  return (
    <>
      <p>Last month's income:</p>
      <input
        type="number"
        value={income}
        onChange={(e) => setIncome(parseFloat(e.target.value))}
      />
      <p>Expenses:</p>
      <button onClick={() => setExpenses([...expenses, 0])}>+</button>
      {expenses.map((val, index) => (
        <input
          type="number"
          key={index}
          value={val}
          onChange={(e) => handleChange(e.target.value, index)}
        />
      ))}
      <br />
      <br />
      <hr />
      <p>Investings : Savings</p>
      <input
        type="number"
        min="0"
        max="100"
        value={ratio.investings}
        onChange={(e) => changeRatios(e.target.value)}
      />{" "}
      : <input type="number" min="0" max="1" value={ratio.savings} disabled />
      <br />
      <br />
      <button onClick={getPercentages}>Generate</button>
      {!errorMsg && (
        <>
          <p>
            Invest: {((income - getTotalExpenses()) / 100) * ratio.investings}
          </p>
          <br />
          <p>Save: {((income - getTotalExpenses()) / 100) * ratio.savings}</p>
        </>
      )}
      <p style={{ color: "red" }}>{errorMsg}</p>
    </>
  );
}
