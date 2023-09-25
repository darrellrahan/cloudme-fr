import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import AuthForm from "./AuthForm";
import Logo from "./Logo";

function Auth({ type }) {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]); // eslint-disable-line

  return (
    <main className="h-screen flex justify-center py-12">
      <div className="flex flex-col items-center gap-10">
        <Logo />
        <AuthForm type={type} />
      </div>
    </main>
  );
}

export default Auth;
