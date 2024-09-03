import React, { useState } from "react";
// import TagManagement from "./TagManagement"; // Commenting out the import

const Footer = () => {
  const [showTagManagement, setShowTagManagement] = useState(false);

  // Comment out the toggle function related to TagManagement
  // const toggleTagManagement = () => {
  //   setShowTagManagement(!showTagManagement);
  // };

  return (
    <div className="footer-section">
      {/* Comment out the tag icon and the related onClick event */}
      {/* <a id="tagName" href="#" role="button" onClick={toggleTagManagement}>
        <i className="fa-solid fa-tag fa-2x"></i>
      </a> */}

      <a id="logout" href={process.env.REACT_APP_LOGOUT_URL} role="button">
        <i className="fa-solid fa-arrow-right-from-bracket fa-2x"></i>
      </a>

      {/* Comment out the TagManagement modal */}
      {/* {showTagManagement && (
        <div className="tag-management-modal">
          <TagManagement />
          <button onClick={toggleTagManagement}>Close</button>
        </div>
      )} */}
    </div>
  );
};

export default Footer;
