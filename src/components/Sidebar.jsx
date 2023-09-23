"use client";

import React from "react";
import { sidebar } from "../dry";
import { useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <section id="sidebar">
      <nav className="bg-white fixed bottom-0 left-0 top-[6.4rem] w-[18.75rem] p-6 flex flex-col gap-6">
        {sidebar.map((data) => (
          <a
            key={data.text}
            href={data.url}
            className={`flex items-center gap-3 text-xl rounded p-2 font-semibold fill-[#012970] hover:fill-[#4154f1] hover:text-[#4154f1] hover:bg-[#DAE9FF] duration-300 ease-linear ${
              location.pathname === data.url
                ? "fill-[#4154f1] text-[#4154f1] bg-[#DAE9FF]"
                : "text-[#012970]"
            }`}
          >
            {data.isReactIcons ? (
              <data.icon fontSize="1.5rem" />
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={data.icon.d1} />
                <g clipPath={data.icon.clipPath}>
                  <path d={data.icon.d2} />
                </g>
                <defs>
                  <clipPath id={data.icon.clipPathId}>
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            )}{" "}
            {<span>{data.text}</span>}
          </a>
        ))}
      </nav>
    </section>
  );
}

export default Sidebar;
