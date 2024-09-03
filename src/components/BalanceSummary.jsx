import React from "react";

const BalanceSummary = ({ balance }) => (
  <div className="balance-summary">
    <h3>Balance: ${balance.toLocaleString()}</h3>
  </div>
);

export default BalanceSummary;
