import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import MainLayout from "./MainLayout";
import MonthlyReport from "./MonthlyReport";
import QuickAccess from "./QuickAccess";
import Title from "./Title";

function Dashboard() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]); // eslint-disable-line

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
