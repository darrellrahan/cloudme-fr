import React from "react";
import MainLayout from "./MainLayout";
import MonthlyReport from "./MonthlyReport";
import QuickAccess from "./QuickAccess";
import Title from "./Title";

function Dashboard() {
  return (
    <MainLayout>
      <section id="dashboard">
        <div className="space-y-8">
          <Title page="Dashboard" />
          <QuickAccess />
          <MonthlyReport />
        </div>
      </section>
    </MainLayout>
  );
}

export default Dashboard;
