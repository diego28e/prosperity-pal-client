import React from "react";

const Header = ({ quote, author }) => (
  <div className="header">
    <h1>
      {quote} - {author}
    </h1>
  </div>
);

export default Header;
