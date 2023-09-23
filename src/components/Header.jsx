import React from "react";
import Logo from "./Logo";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import search from "../assets/search.svg";

function Header() {
  const [user] = useAuthState(auth);

  return (
    <section id="header">
      <header className="bg-white p-6 flex items-center justify-between shadow-[0px_1px_4px_#b6b6b6] fixed top-0 inset-x-0">
        <div className="flex items-center">
          <div className="w-[17.1875rem]">
            <Logo />
          </div>
          <input
            type="text"
            autoComplete="off"
            placeholder="Cari"
            className="w-[20rem] h-[3.125rem] pl-12 pr-3 text-xl bg-[#efefef] rounded bg-[calc(0%_+_12px)_center] bg-no-repeat duration-300 ease-linear focus:w-[26.25rem] placeholder:text-[#808080]"
            style={{ backgroundImage: `url('${search}')` }}
          />
        </div>
        <div className="flex items-center gap-8">
          <div>
            <h4 className="text-xl text-[#012970]">{user?.displayName}</h4>
            <p className="text-[#808080]">{user?.email}</p>
          </div>
          <button
            onClick={() => signOut(auth)}
            className="text-[#808080] duration-300 ease-linear hover:opacity-50"
          >
            Logout
          </button>
        </div>
      </header>
    </section>
  );
}

export default Header;
