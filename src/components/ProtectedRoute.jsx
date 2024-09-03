import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ element }) => {
  const token = Cookies.get("token"); // Attempt to retrieve the token

  // As a backup, try retrieving the token using document.cookie
  const allCookies = document.cookie;

  // Manually parse the token if Cookies.get doesn't work
  const parsedToken = allCookies
    .split("; ")
    .find((row) => row.startsWith("token="));
  const tokenValue = parsedToken ? parsedToken.split("=")[1] : undefined;

  if (!tokenValue) {
    return <Navigate to="/" />;
  }

  console.log("Token found, rendering element...");
  return element;
};

export default ProtectedRoute;
