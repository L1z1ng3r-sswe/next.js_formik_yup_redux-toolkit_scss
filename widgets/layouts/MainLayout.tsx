import React from "react";
import Header from "../header";

const MainLayout: React.FC<{ children: any }> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
