import React from "react";
import "./new-ui-reset.css"; // optional, we’ll add later
import Navbar from "./NewDesign/layout/Navbar";
import Footer from "./NewDesign/layout/Footer";

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

      <Footer />

    </div>
  )
};

export default NewLayout;
