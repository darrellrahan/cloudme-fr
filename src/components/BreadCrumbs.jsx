import React from "react";
import { Link } from "react-router-dom";
import { ROOT_FOLDER } from "../hooks/useFolder";

function BreadCrumbs({ currentFolder, jenisSurat }) {
  ROOT_FOLDER.name = jenisSurat;

  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];

  if (currentFolder) path = [...path, ...currentFolder.path];

  return (
    <div className="breadcrumbs">
      {currentFolder?.name === jenisSurat && <p>{jenisSurat}</p>}
      {path.map((folder) => (
        <div
          key={folder.id}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <Link to={folder.id ? `/folder/${folder.id}` : "/incoming"}>
            {folder.name}
          </Link>
          <span>/</span>
        </div>
      ))}
      {currentFolder && <span>{currentFolder.namaInstansi}</span>}
    </div>
  );
}

export default BreadCrumbs;
