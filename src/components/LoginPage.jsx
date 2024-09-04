import React from "react";

const LoginPage = () => {
  const handleLogin = () => {
    const loginUrl =
      "https://prosperity-pal-api.up.railway.app/auth/google/secrets";

    if (!loginUrl) {
      console.error("Login URL is not defined in environment variables.");
      return;
    }

    // Redirect to the backend's Google OAuth endpoint
    window.location.href = loginUrl;
  };

  return (
    <div className="login-page">
      <div className="jumbotron centered">
        <div className="login-container">
          <i className="fas fa-piggy-bank fa-6x"></i>
          <h1 className="app-name">I'm your prosperity Pal</h1>
          <p className="lead">Manage your money in a simple way!</p>
          <em>Developed by Diego E.</em>
          <hr />
          <button onClick={handleLogin} className="google-btn">
            <i className="fab fa-google fa-2x"></i> Sign In with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
