import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

function MainLayout({ children }) {
  return (
    <main>
      <Header />
      <Sidebar />
      <section id="main" className="ml-[18.75rem] mt-[6.4rem] p-6">
        {children}
      </section>
    </main>
  );
}

export default MainLayout;
