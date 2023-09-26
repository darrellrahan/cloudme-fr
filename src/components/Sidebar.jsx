"use client";

import React, { useEffect } from "react";
import { sidebar } from "../dry";
import { useLocation, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Sidebar() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user && !loading) navigate("/login");
  }, [user]); // eslint-disable-line

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
        <button
          onClick={() => signOut(auth)}
          className="flex items-center gap-3 text-xl rounded p-2 font-semibold text-[#012970] hover:fill-[#4154f1] hover:text-[#4154f1] hover:bg-[#DAE9FF] duration-300 ease-linear"
        >
          <FiLogOut fontSize="1.5rem" />
          <span>Logout</span>
        </button>
      </nav>
    </section>
  );
}

export default Sidebar;
