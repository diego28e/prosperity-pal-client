import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faSave,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={toggleAccordion}>
        <span>{title}</span>
        <span>
          {isOpen ? (
            <FontAwesomeIcon icon={faChevronUp} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          )}
        </span>
      </div>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

const DataDescriptionContainer = ({
  incomes,
  expenses,
  fetchData,
  showNotification,
}) => {
  // Define totalIncome and totalExpenses here
  const totalIncome = incomes.length
    ? incomes.reduce((acc, income) => acc + parseFloat(income.amount), 0)
    : 0;

  const totalExpenses = expenses.length
    ? expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0)
    : 0;

  const [editingIncomeId, setEditingIncomeId] = useState(null);
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [editedIncome, setEditedIncome] = useState({});
  const [editedExpense, setEditedExpense] = useState({});

  const handleEditIncome = (income) => {
    setEditingIncomeId(income.id);
    setEditedIncome({ ...income });
  };

  const handleEditExpense = (expense) => {
    setEditingExpenseId(expense.id);
    setEditedExpense({ ...expense });
  };

  const handleSaveIncome = async (id) => {
    try {
      await axios.patch(
        `prosperity-pal-api.up.railway.app/income/update/${id}`,
        editedIncome
      );
      fetchData(); // Re-fetch the data after updating
      setEditingIncomeId(null);
      showNotification("Income updated successfully!");
    } catch (error) {
      console.error("Failed to update income", error);
    }
  };

  const handleSaveExpense = async () => {
    try {
      console.log("Saving Expense ID:", editingExpenseId); // Debug: Ensure correct ID
      await axios.patch(
        `prosperity-pal-api.up.railway.app/expense/update/${editingExpenseId}`,
        editedExpense
      );
      fetchData(); // Re-fetch the data after updating
      setEditingExpenseId(null);
      showNotification("Expense updated successfully!");
    } catch (error) {
      console.error("Failed to update expense", error);
    }
  };

  const handleDeleteIncome = async (id) => {
    try {
      await axios.post(`prosperity-pal-api.up.railway.app/income/delete/${id}`);
      fetchData(); // Re-fetch the data after deletion
      showNotification("Income deleted successfully!");
    } catch (error) {
      console.error("Failed to delete income", error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await axios.post(
        `prosperity-pal-api.up.railway.app/expense/delete/${id}`
      );
      fetchData(); // Re-fetch the data after deletion
      showNotification("Expense deleted successfully!");
    } catch (error) {
      console.error("Failed to delete expense", error);
    }
  };

  return (
    <div id="data-description-container" className="dataDescriptionContainer">
      {/* Display total income */}
      <div id="income-list" className="income-list">
        <h3>Total Income: ${totalIncome.toLocaleString()}</h3>
        {incomes.map((income, index) => (
          <AccordionItem key={index} title={income.tag_name}>
            {editingIncomeId === income.id ? (
              <>
                <input
                  type="text"
                  className="editable-input"
                  value={editedIncome.tag_name}
                  onChange={(e) =>
                    setEditedIncome({
                      ...editedIncome,
                      tag_name: e.target.value,
                    })
                  }
                />
                <input
                  type="number"
                  className="editable-input"
                  value={editedIncome.amount}
                  onChange={(e) =>
                    setEditedIncome({ ...editedIncome, amount: e.target.value })
                  }
                />
                <input
                  type="date"
                  className="editable-input"
                  value={
                    new Date(editedIncome.date).toISOString().split("T")[0]
                  }
                  onChange={(e) =>
                    setEditedIncome({ ...editedIncome, date: e.target.value })
                  }
                />
                <FontAwesomeIcon
                  icon={faSave}
                  className="save-icon"
                  onClick={() => handleSaveIncome(income.id)}
                />
              </>
            ) : (
              <>
                <p>${parseFloat(income.amount).toLocaleString()}</p>
                <p className="income-date">
                  {new Date(income.date).toLocaleDateString()}
                </p>
                <FontAwesomeIcon
                  icon={faEdit}
                  className="edit-icon"
                  onClick={() => handleEditIncome(income)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className="delete-icon"
                  onClick={() => handleDeleteIncome(income.id)}
                />
              </>
            )}
          </AccordionItem>
        ))}
      </div>

      {/* Display total expenses */}
      <div id="expense-list" className="expense-list">
        <h3>Total Expenses: ${totalExpenses.toLocaleString()}</h3>
        {expenses.map((expense, index) => (
          <AccordionItem key={index} title={expense.tag_name}>
            {editingExpenseId === expense.id ? (
              <>
                <input
                  type="text"
                  className="editable-input"
                  value={editedExpense.tag_name}
                  onChange={(e) =>
                    setEditedExpense({
                      ...editedExpense,
                      tag_name: e.target.value,
                    })
                  }
                />
                <input
                  type="number"
                  className="editable-input"
                  value={editedExpense.amount}
                  onChange={(e) =>
                    setEditedExpense({
                      ...editedExpense,
                      amount: e.target.value,
                    })
                  }
                />
                <input
                  type="date"
                  className="editable-input"
                  value={
                    new Date(editedExpense.date).toISOString().split("T")[0]
                  }
                  onChange={(e) =>
                    setEditedExpense({ ...editedExpense, date: e.target.value })
                  }
                />
                <FontAwesomeIcon
                  icon={faSave}
                  className="save-icon"
                  onClick={() => handleSaveExpense(expense.id)}
                />
              </>
            ) : (
              <>
                <p>${parseFloat(expense.amount).toLocaleString()}</p>
                <p className="expense-date">
                  {new Date(expense.date).toLocaleDateString()}
                </p>
                <FontAwesomeIcon
                  icon={faEdit}
                  className="edit-icon"
                  onClick={() => handleEditExpense(expense)}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  className="delete-icon"
                  onClick={() => handleDeleteExpense(expense.id)}
                />
              </>
            )}
          </AccordionItem>
        ))}
      </div>
    </div>
  );
};

export default DataDescriptionContainer;
