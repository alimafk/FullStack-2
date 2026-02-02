import { createContext, useContext, useEffect, useState } from "react";

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const getInitialExpenses = () => {
    try {
      const stored = localStorage.getItem("expenses");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const [expenses, setExpenses] = useState(getInitialExpenses);
  const [budget, setBudget] = useState(0);
  const [income, setIncome] = useState(0);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        budget,
        income,
        setBudget,
        setIncome,
        addExpense,
        deleteExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => useContext(ExpenseContext);
