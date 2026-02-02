import { useExpense } from "../context/ExpenseContext";

const ExpenseList = () => {
  const { expenses, deleteExpense } = useExpense();

  return (
    <ul>
      {expenses.map(exp => (
        <li key={exp.id}>
          ₹{exp.amount} - {exp.category}
          <button onClick={() => deleteExpense(exp.id)}>❌</button>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
