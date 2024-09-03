import React, { useState } from "react";
import axios from "axios";

const ExpenseModal = ({ show, handleClose, addExpense }) => {
  const [amount, setAmount] = useState("");

  // Function to format the number with commas and validate input
  const handleAmountChange = (e) => {
    let value = e.target.value;

    // Remove any non-digit and non-decimal characters
    value = value.replace(/[^\d.]/g, "");

    // Only allow one decimal point and format with commas
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      // Format with commas
      const parts = value.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setAmount(parts.join("."));
    }
  };

  return (
    show && (
      <div id="expense-modal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={handleClose}>
            <i className="fa-solid fa-xmark"></i>
          </span>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const expense = {
                tag_name: formData.get("tag_name"),
                amount: formData.get("amount").replace(/,/g, ""), // Remove commas before submission
                date: formData.get("date"),
              };
              try {
                await axios.post(
                  `${process.env.REACT_APP_API_DOMAIN}/expense/add`,
                  expense
                );
                addExpense(expense);
                handleClose();
              } catch (error) {
                console.error("There was an error adding the expense!", error);
              }
            }}
          >
            <div className="amountAndDate">
              <h2 className="modal-header">Add Expense</h2>
              <div className="dataBlock">
                <label htmlFor="tag">Expense Name:</label>
                <input
                  placeholder="Enter expense name"
                  type="text"
                  name="tag_name"
                  required
                />
              </div>
              <div className="dataBlock">
                <label htmlFor="amount">Expense Amount:</label>
                <input
                  type="text"
                  name="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  required
                  placeholder="$ Ente a number"
                  className="amount-input"
                />
              </div>
              <div className="dataBlock">
                <label htmlFor="date">Date:</label>
                <input type="date" name="date" required />
              </div>
            </div>

            <button type="submit">Add Expense</button>
          </form>
        </div>
      </div>
    )
  );
};

export default ExpenseModal;
