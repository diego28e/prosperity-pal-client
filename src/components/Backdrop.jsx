import React from "react";

const Backdrop = ({ show }) => (
  <div className={`backdrop ${show ? "visible" : ""}`}></div>
);

export default Backdrop;
