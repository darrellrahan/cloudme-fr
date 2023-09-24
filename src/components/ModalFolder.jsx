import React, { useState } from "react";
import { addFolder, auth } from "../firebase";
import { ROOT_FOLDER } from "../hooks/useFolder";
import { useAuthState } from "react-firebase-hooks/auth";

function ModalFolder({ isModal, setIsModal, folder }) {
  const [user] = useAuthState(auth);
  const [jenisSurat, setJenisSurat] = useState("");
  const [nomorSurat, setNomorSurat] = useState("");
  const [namaInstansi, setNamaInstansi] = useState("");

  function addFolderLocal() {
    if (jenisSurat === "" || nomorSurat === "" || namaInstansi === "")
      alert("Semua field wajib diisi!");
    else {
      const path = [...folder.path];
      if (folder !== ROOT_FOLDER) {
        path.push({ name: folder.name, id: folder.id });
      }
      addFolder(jenisSurat, nomorSurat, namaInstansi, user.uid, folder, path);
      setJenisSurat("");
      setNomorSurat("");
      setNamaInstansi("");
      setIsModal(false);
    }
  }

  if (!isModal) return;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Add Folder</h2>
        <select onChange={(e) => setJenisSurat(e.target.value)}>
          <option value="" disabled selected>
            Pilih jenis surat
          </option>
          <option value="incoming">Surat Masuk</option>
          <option value="outgoing">Surat Keluar</option>
        </select>
        <input
          type="text"
          onChange={(e) => setNomorSurat(e.target.value)}
          value={nomorSurat}
          placeholder="Nomor surat"
          style={{ width: "100%" }}
          className="folder-name-input"
        />
        <input
          type="text"
          onChange={(e) => setNamaInstansi(e.target.value)}
          value={namaInstansi}
          placeholder="Nama Instansi"
          style={{ width: "100%" }}
          className="folder-name-input"
        />
        <div className="justify-between">
          <div></div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              className="green-outline-btn"
              onClick={() => setIsModal(false)}
            >
              Close
            </button>
            <button className="green-primary-btn" onClick={addFolderLocal}>
              Add Folder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalFolder;
