// Extract to its own component
"use client";

import Image from "next/image";
import { useState } from "react";

interface Ratio {
  investings: number;
  savings: number;
}

interface Category {
  id: number;
  name: string;
}

interface Expense {
  id: number;
  category: string;
  amount: number;
  isRecreational: boolean;
}

export default function Home() {
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [ratio, setRatio] = useState<Ratio>({ investings: 50, savings: 50 });
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Travel" },
    { id: 2, name: "Food" },
  ]);
  const [recSpending, setRecSpending] = useState<number>(50);
  const [idCounter, setIdCounter] = useState(0);
  const [categoryInput, setCategoryInput] = useState<string>("");

  const addExpense = () => {
    const newExpense: Expense = {
      id: idCounter,
      category: "travel",
      amount: 0,
      isRecreational: false,
    };
    setExpenses([...expenses, newExpense]);
    setIdCounter(idCounter + 1);
  };

  const changeExpenseAmount = (newVal: string, id: number) => {
    if (parseInt(newVal)) {
      const newExpenses = [...expenses];
      const expense = newExpenses.find((e) => e.id === id)!;
      expense.amount = Number(newVal);
      setExpenses(newExpenses);
    }
  };

  const removeExpense = (id: number) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // Return the sum of all expenses
  const getTotalExpenses = () => {
    return [...expenses].reduce((total, current) => total + current.amount, 0);
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

  const toggleRecreational = (id: number) => {
    const newExpenses = [...expenses];
    const expense = newExpenses.find((exp) => exp.id === id)!;
    expense.isRecreational = !expense?.isRecreational;
    setExpenses(newExpenses);
  };

  const addCategory = () => {
    setCategories([...categories, { id: idCounter, name: categoryInput }]);
    setCategoryInput("");
    setIdCounter(idCounter + 1);
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
      <button onClick={addExpense}>+</button>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {expenses.map((exp) => (
          <div style={{ marginBottom: "1.5rem" }}>
            <select>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              key={exp.id}
              value={exp.amount}
              onChange={(e) => changeExpenseAmount(e.target.value, exp.id)}
            />
            <input
              type="checkbox"
              id={exp.id.toString()}
              checked={exp.isRecreational}
              onChange={() => toggleRecreational(exp.id)}
            />
            <label htmlFor={exp.id.toString()}>Is recreational</label>
            <br />
            <button onClick={() => removeExpense(exp.id)}>Remove</button>
          </div>
        ))}
      </div>
      <br />
      <br />
      <hr />
      <p>Categories:</p>
      {categories.map((cat) => (
        <span>{cat.name}, </span>
      ))}
      <br />
      <input
        value={categoryInput}
        onChange={(e) => setCategoryInput(e.target.value)}
      />
      <button onClick={addCategory}>Add Category</button>
      <br />
      <br />
      <hr />
      {/* <p>Recreational spending expense:</p>
      <input
        type="number"
        value={recSpending}
        onChange={(e) => setRecSpending(Number(e.target.value))}
      /> */}
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
            Invest:{" "}
            {((income - recSpending - getTotalExpenses()) / 100) *
              ratio.investings}
          </p>
          <br />
          <p>
            Save:{" "}
            {((income - recSpending - getTotalExpenses()) / 100) *
              ratio.savings}
          </p>
        </>
      )}
      <p style={{ color: "red" }}>{errorMsg}</p>
    </>
  );
}
