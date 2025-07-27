import React from "react";

const MainLayout = ({ children }) => {
  console.log("Rendered");
  return (
    <div className="container mx-auto my-10">
      {children}
    </div>
  );
};

export default MainLayout;
