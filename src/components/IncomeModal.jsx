import React, { useState } from "react";
import axios from "axios";

const IncomeModal = ({ show, handleClose, addIncome }) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const income = {
      tag_name: formData.get("tag_name"),
      // Remove commas from amount before submitting
      amount: formData.get("amount").replace(/,/g, ""),
      date: formData.get("date"),
    };

    console.log("Submitting income", income);

    try {
      await axios.post(`prosperity-pal-api.up.railway.app/income/add`, income);
      addIncome(income);
      handleClose();
    } catch (error) {
      console.error("There was an error adding the income!", error);
    }
  };

  return (
    show && (
      <div id="income-modal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={handleClose}>
            <i className="fa-solid fa-xmark"></i>
          </span>
          <form onSubmit={handleSubmit}>
            <div className="amountAndDate">
              <h2 className="modal-header">Add Income</h2>
              <div className="dataBlock">
                <label htmlFor="tag">Income Name:</label>
                <input
                  placeholder="Enter expense name"
                  type="text"
                  name="tag_name"
                  required
                />
              </div>
              <div className="dataBlock">
                <label htmlFor="amount">Income Amount:</label>
                <input
                  type="text"
                  name="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  required
                  placeholder="$ Enter a number"
                  className="amount-input"
                />
              </div>
              <div className="dataBlock">
                <label htmlFor="date">Date:</label>
                <input type="date" name="date" required />
              </div>
            </div>

            <button type="submit">Add Income</button>
          </form>
        </div>
      </div>
    )
  );
};

export default IncomeModal;
