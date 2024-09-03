// components/IncomeExpenseButtons.jsx
import React from "react";

const IncomeExpenseButtons = ({
  handleIncomeModalOpen,
  handleExpenseModalOpen,
}) => {
  return (
    <div className="incomeExpenseButtons">
      <div className="add-button" onClick={handleIncomeModalOpen}>
        <span>Add Income</span>
        <i className="fa-solid fa-circle-plus fa-2x"></i>
      </div>
      <div className="add-button" onClick={handleExpenseModalOpen}>
        <span>Add Expense</span>
        <i className="fa-solid fa-circle-minus fa-2x"></i>
      </div>
    </div>
  );
};

export default IncomeExpenseButtons;
