import React from "react";

function Title({ page }) {
  return (
    <div>
      <h1 className="text-[#012970] text-2xl font-medium mb-4">{page}</h1>
      <hr className="w-full border border-black border-opacity-10" />
    </div>
  );
}

export default Title;
