import { useExpense } from "../context/ExpenseContext";
import React from "react";

const Budget = () => {
  const { budget, setBudget } = useExpense();

  return (
    <>
      <h2>Set Monthly Budget</h2>
      <input
        type="number"
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
      />
    </>
  );
};

export default Budget;
