import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { auth, getError } from "../firebase";

function AuthForm({ type }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function register(name, email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: name,
        }).catch((error) => {
          alert(getError(error.code));
        });
      })
      .catch((error) => {
        alert(getError(error.code));
      });
  }

  function login(email, password) {
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      alert(getError(error.code));
    });
  }

  return (
    <div className="w-[39.375rem] rounded-lg bg-white shadow-[4px_4px_8px_#b6b6b6] p-6 flex gap-8 flex-col">
      <div className="text-center">
        <h3 className="text-[#012970] text-3xl font-semibold text-center mb-2">
          {type === "login" ? "Masuk ke Akun Anda" : "Buat Akun"}
        </h3>
        <p className="text-[#808080]">
          {type === "login"
            ? "Masukkan email dan kata sandi anda"
            : "Masukkan detail pribadi anda untuk membuat akun"}
        </p>
      </div>
      <div className="space-y-4">
        {type === "register" && (
          <div>
            <label htmlFor="name" className="text-xl">
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full h-[2.8125rem] rounded-lg border border-[#808080] mt-2 px-3"
              type="text"
              id="name"
            />
          </div>
        )}
        <div>
          <label htmlFor="email" className="text-xl">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full h-[2.8125rem] rounded-lg border border-[#808080] mt-2 px-3"
            type="email"
            id="email"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-xl">
            Kata Sandi
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full h-[2.8125rem] rounded-lg border border-[#808080] mt-2 px-3"
            type="password"
            id="password"
          />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="cb" />
          <label htmlFor="cb" className="text-[#333]">
            {type === "login" ? "Ingat Saya" : "Saya setuju dan menerima "}
            {type === "register" && (
              <a
                href="/terms-condition"
                className="text-[#4154f1] duration-300 ease-linear hover:opacity-50"
              >
                Syarat dan Ketentuan
              </a>
            )}
          </label>
        </div>
        <div>
          <button
            onClick={() =>
              type === "login"
                ? login(email, password)
                : register(name, email, password)
            }
            className="bg-[#4154f1] text-white w-full rounded-lg text-xl leading-[1px] h-[2.8125rem] duration-300 ease-linear hover:bg-[#4154f150] font-medium block flex items-center justify-center"
          >
            {type === "login" ? "Masuk" : "Buat Akun"}
          </button>
        </div>
        <div>
          <p className="text-[#333]">
            {type === "login" ? "Tidak punya akun?" : "Sudah punya akun?"}{" "}
            <a
              href={type === "login" ? "/register" : "/login"}
              className="text-[#4154f1] duration-300 ease-linear hover:opacity-50"
            >
              {type === "login" ? "Buat akun" : "Masuk"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
