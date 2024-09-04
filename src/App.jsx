import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import LoginPage from "./components/LoginPage"; // Import LoginPage
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import "./App.css";
import Footer from "./components/Footer";
import IncomeExpenseButtons from "./components/IncomeExpenseButtons";
import DataDescriptionContainer from "./components/DataDescriptionContainer";
import Header from "./components/Header";
import WelcomeMessage from "./components/WelcomeMessage";
import MonthNavigation from "./components/MonthNavigation";
import BalanceSummary from "./components/BalanceSummary";
const IncomeModal = React.lazy(() => import("./components/IncomeModal"));
const ExpenseModal = React.lazy(() => import("./components/ExpenseModal"));
import Backdrop from "./components/Backdrop";

// Ensure that Axios sends cookies with each request
axios.defaults.withCredentials = true;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Dashboard = () => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [balance, setBalance] = useState(0);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [notification, setNotification] = useState({
    open: false,
    message: "",
  });

  const handleCloseNotification = () => {
    setNotification({ open: false, message: "" });
  };

  const fetchData = () => {
    axios
      .get(
        `prosperity-pal-api.up.railway.app/secrets?month=${month}&year=${year}`
      )
      .then((response) => {
        const data = response.data;
        setIncomes(data.incomes || []);
        setExpenses(data.expenses || []);
        setBalance((data.totalIncome || 0) - (data.totalExpenses || 0));
        setQuote(data.quote || "No quote available");
        setAuthor(data.author || "Unknown");
        setDisplayName(data.displayName || "");
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  };

  useEffect(() => {
    fetchData(); // Fetch data initially
  }, [month, year]);

  const handlePrevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const handleIncomeModalOpen = () => setShowIncomeModal(true);
  const handleIncomeModalClose = () => setShowIncomeModal(false);

  const handleExpenseModalOpen = () => setShowExpenseModal(true);
  const handleExpenseModalClose = () => setShowExpenseModal(false);

  const addIncome = (income) => {
    setIncomes([...incomes, income]);
    setBalance(balance + parseFloat(income.amount));
  };

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
    setBalance(balance - parseFloat(expense.amount));
  };

  const showNotification = (message) => {
    setNotification({ open: true, message });
  };

  return (
    <div className="container">
      <Backdrop show={showIncomeModal || showExpenseModal} />

      <Header quote={quote} author={author} />
      <Footer />

      <WelcomeMessage displayName={displayName} />

      <MonthNavigation
        month={month}
        year={year}
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
      />

      <BalanceSummary balance={balance} />

      <IncomeExpenseButtons
        handleIncomeModalOpen={handleIncomeModalOpen}
        handleExpenseModalOpen={handleExpenseModalOpen}
      />

      <Suspense fallback={<div>Loading...</div>}>
        <IncomeModal
          show={showIncomeModal}
          handleClose={handleIncomeModalClose}
          addIncome={addIncome}
        />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <ExpenseModal
          show={showExpenseModal}
          handleClose={handleExpenseModalClose}
          addExpense={addExpense}
        />
      </Suspense>

      <DataDescriptionContainer
        incomes={incomes}
        expenses={expenses}
        fetchData={fetchData}
        showNotification={showNotification} // Pass the showNotification function
      />

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={handleCloseNotification}
      >
        <Alert onClose={handleCloseNotification} severity="success">
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
