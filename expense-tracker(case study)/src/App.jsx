import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Budget from "./pages/Budget";
import Reports from "./pages/Reports";
import "./App.css";
import { useExpense } from "./context/ExpenseContext";

function App() {
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <h1>💰 Expense Tracker</h1>
          <ul className="hi">
            <button ><Link to="/">Dashboard</Link></button>
            <button><Link to="/budget">Budget</Link></button>
            <button><Link to="/reports">Reports</Link></button>
          </ul>
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
