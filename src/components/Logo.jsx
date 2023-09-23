import React from "react";

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2">
      <img src="/assets/logo.svg" alt="logo" width={45} height={45} />
      <span className="text-[#012970] text-3xl font-semibold">CloudMe</span>
    </a>
  );
}

export default Logo;
