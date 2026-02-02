import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";
import { useExpense } from "../context/ExpenseContext";

// REGISTER ELEMENTS (THIS FIXES THE ERROR)
ChartJS.register(ArcElement, Tooltip, Legend);

const Reports = () => {
  const { expenses } = useExpense();

  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + Number(exp.amount);
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
      },
    ],
  };

  return (
    <>
      <h2>Expense Report</h2>
      <Pie data={data} />
    </>
  );
};

export default Reports;
