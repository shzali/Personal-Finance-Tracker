"use client";

import { redirect, RedirectType, useParams } from "next/navigation";

import Image from "next/image";
import { useEffect, useState } from "react";

import months from "@/utils/months";
import axios from "axios";

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
  categoryId: number;
  amount: number;
  isFun: boolean;
}

const MonthExpenses = () => {
  const params = useParams<{ month: string }>();

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
  const [maxFunAmount, setMaxFunAmount] = useState<number>(50);

  useEffect(() => {
    const getMonthData = async () => {
      try {
        const res = await axios.get(`/api/months/${params.month}-2026`);

        if (res.status === 200) {
          console.log("STATUS OK");
          const data = res.data.data;
          console.log(data);
          setIncome(Number(data.income));
          setRatio({
            investings: data.investingPercentage,
            savings: 100 - data.investingPercentage,
          });
          setMaxFunAmount(data.funLimit);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getMonthData();
  }, []);

  const addExpense = () => {
    const newExpense: Expense = {
      id: idCounter,
      categoryId: 1,
      amount: 0,
      isFun: false,
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
    return expenses.reduce((acc, cur) => acc + cur.amount, 0);
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

  const toggleFun = (id: number) => {
    const newExpenses = [...expenses];
    const expense = newExpenses.find((exp) => exp.id === id)!;
    expense.isFun = !expense?.isFun;
    setExpenses(newExpenses);
  };

  const addCategory = () => {
    setCategories([...categories, { id: idCounter, name: categoryInput }]);
    setCategoryInput("");
    setIdCounter(idCounter + 1);
  };

  const getTotalFunExpenses = () => {
    return expenses.reduce(
      (acc, cur) => (cur.isFun ? acc + cur.amount : acc),
      0,
    );
  };

  // If the total Fun expenses amount has exceeded the Fun budget,
  // then get the amount that has exceeded the budget
  const getFunExpensesSpillover = () => {
    const totalFunExpenses = getTotalFunExpenses();
    return totalFunExpenses > maxFunAmount
      ? totalFunExpenses - maxFunAmount
      : 0;
  };

  // Save data to database
  const saveData = async () => {
    console.log(expenses);
    try {
      const res = await axios.put(`/api/months/${params.month}-2026`, {
        income,
        investingPercentage: ratio.investings,
        funLimit: maxFunAmount,
        necessaryExpenses: getTotalExpenses() - getTotalFunExpenses(),
        funExpenses: getTotalFunExpenses(),
        expenses,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {months.includes(params.month.toLowerCase()) ? (
        <>
          <button onClick={() => redirect("/", RedirectType.push)}>BACK</button>
          <p>Income:</p>
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
                  checked={exp.isFun}
                  onChange={() => toggleFun(exp.id)}
                />
                <label htmlFor={exp.id.toString()}>Is Fun</label>
                <br />
                <button onClick={() => removeExpense(exp.id)}>Remove</button>
              </div>
            ))}
          </div>
          <p>Fun money amount:</p>
          <input
            type="number"
            value={maxFunAmount}
            onChange={(e) => setMaxFunAmount(Number(e.target.value))}
          />
          <p>Fun money left: {maxFunAmount - getTotalFunExpenses()}</p>
          {getTotalFunExpenses() > maxFunAmount && (
            <p style={{ color: "red" }}>
              Spillover: {getFunExpensesSpillover()}
            </p>
          )}
          <p>TOTAL EXPENSES: {getTotalExpenses()}</p>
          <br />
          <br />
          <hr />
          <p>'Big Purchase' Pot Contribution: £25</p>
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
          <p>Investings : Savings</p>
          <input
            type="number"
            min="0"
            max="100"
            value={ratio.investings}
            onChange={(e) => changeRatios(e.target.value)}
          />{" "}
          :{" "}
          <input type="number" min="0" max="1" value={ratio.savings} disabled />
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
                  ratio.savings}{" "}
                (with leftover Fun money added)
              </p>
              <br />
              <br />
              <button onClick={saveData}>SAVE</button>
            </>
          )}
          <p style={{ color: "red" }}>{errorMsg}</p>
        </>
      ) : (
        <p>Invalid</p>
      )}
    </>
  );
};

export default MonthExpenses;
