import React from "react";
import { AiFillFolder } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { quickAccess } from "../dry";

function QuickAccess() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-[#012970] text-2xl font-semibold mb-4">
        Quick Access
      </h3>
      <div className="grid grid-cols-5 gap-8">
        {quickAccess.map((data) => (
          <div key={data.folderName}>
            <div className="rounded-t-2xl bg-white shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <AiFillFolder color="#012970" fontSize="2.5rem" />
                <button>
                  <BsThreeDotsVertical color="#012970" />
                </button>
              </div>
              <p
                className="text-[#012970] font-semibold text-lg truncate"
                title={data.folderName}
              >
                {data.folderName}
              </p>
            </div>
            <div className="rounded-b-2xl bg-[#012970] shadow p-4 flex justify-between text-white text-sm">
              <p>
                {data.numOfFiles} File{data.numOfFiles !== 1 && "s"}
              </p>
              <p>{data.size} Mb</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuickAccess;
