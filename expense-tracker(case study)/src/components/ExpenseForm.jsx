import { useState } from "react";
import { useExpense } from "../context/ExpenseContext";

const ExpenseForm = () => {
  const { addExpense } = useExpense();
  const [form, setForm] = useState({
    amount: "",
    category: "Food",
    date: "",
    note: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || form.amount <= 0) return;
    addExpense(form);
    setForm({ amount: "", category: "Food", date: "", note: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={e => setForm({ ...form, amount: e.target.value })}
      />

      <select
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
      >
        <option>Food</option>
        <option>Travel</option>
        <option>Rent</option>
        <option>Shopping</option>
        <option>Medical</option>
        <option>Others</option>
      </select>

      <input
        type="date"
        value={form.date}
        onChange={e => setForm({ ...form, date: e.target.value })}
      />

      <button>Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
