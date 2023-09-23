"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { faker } from "@faker-js/faker";

function MonthlyReport() {
  Chart.register(CategoryScale);

  const labels = ["January", "February", "March", "April", "May", "June"];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-[#012970] text-2xl font-semibold">
          Monthly Report
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#4154F1]"></span>
            <span>Surat Keluar</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-[#DAE9FF]"></span>
            <span>Surat Masuk</span>
          </div>
        </div>
      </div>
      <Bar
        options={{
          responsive: true,
          plugins: { legend: { display: false } },
        }}
        data={{
          labels,
          datasets: [
            {
              label: "Surat Keluar",
              data: labels.map(() => faker.number.int({ min: 1, max: 50 })),
              backgroundColor: "#4154F1",
            },
            {
              label: "Surat Masuk",
              data: labels.map(() => faker.number.int({ min: 1, max: 50 })),
              backgroundColor: "#DAE9FF",
            },
          ],
        }}
      />
    </div>
  );
}

export default MonthlyReport;
