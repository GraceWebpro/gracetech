import React from "react";
import "./new-ui-reset.css"; // optional, we’ll add later
import Navbar from "./NewDesign/layout/Navbar";

const NewLayout = ({ children }) => {
  return ( 
    <div className="min-h-screen bg-[#151022]">
      {/* Uncomment ONLY when ready */}
      <Navbar />      

    {/* New design system starts here */}
    <div className="new-ui-root">
        <div className="ui">
          {children}
        </div>
      </div>

    </div>
  )
};

export default NewLayout;
