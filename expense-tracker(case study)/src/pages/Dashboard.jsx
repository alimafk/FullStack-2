import { useExpense } from "../context/ExpenseContext";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

const Dashboard = () => {
  const { expenses, income, budget } = useExpense();

  const totalExpenses = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  return (
    <>
      <h2>Dashboard</h2>

      <p><strong>Monthly Budget:</strong> ₹{budget}</p>
      <p><strong>Total Expenses:</strong> ₹{totalExpenses}</p>
      <p><strong>Remaining:</strong> ₹{budget - totalExpenses}</p>

      <ExpenseForm />
      <ExpenseList />
    </>
  );
};

export default Dashboard;
