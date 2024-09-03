import React from "react";

const MonthNavigation = ({ month, year, handlePrevMonth, handleNextMonth }) => (
  <div className="monthNavigation">
    <i className="fa-solid fa-chevron-left fa-2x" onClick={handlePrevMonth}></i>
    <span>{`${month}/${year}`}</span>
    <i
      className="fa-solid fa-chevron-right fa-2x"
      onClick={handleNextMonth}
    ></i>
  </div>
);

export default MonthNavigation;
