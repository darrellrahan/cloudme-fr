import React, { useState } from "react";
import { addFolder, auth } from "../firebase";
import { ROOT_FOLDER } from "../hooks/useFolder";
import { useAuthState } from "react-firebase-hooks/auth";
import { IoClose } from "react-icons/io5";

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
    <div className="fixed inset-0 bg-black/75 z-[1000]">
      <div className="absolute w-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1001]">
        <div className="flex justify-between items-center bg-[#012970] rounded-t-lg text-white px-6 py-3 text-xl">
          <h3>Surat Baru</h3>
          <button onClick={() => setIsModal(false)}>
            <IoClose className="text-2xl" />
          </button>
        </div>
        <div className="bg-white rounded-b-lg p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="jenis-surat">Jenis Surat</label>
            <select
              id="jenis-surat"
              onChange={(e) => setJenisSurat(e.target.value)}
              className="border border-black/20 rounded-lg p-2"
            >
              <option value="" disabled selected>
                Pilih jenis surat
              </option>
              <option value="incoming">Surat Masuk</option>
              <option value="outgoing">Surat Keluar</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="nomor-surat">Nomor Surat</label>
            <input
              id="nomor-surat"
              type="text"
              onChange={(e) => setNomorSurat(e.target.value)}
              className="border border-black/20 rounded-lg p-2"
              value={nomorSurat}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="nama-instansi">Nama Instansi</label>
            <input
              id="nama-instansi"
              type="text"
              onChange={(e) => setNamaInstansi(e.target.value)}
              className="border border-black/20 rounded-lg p-2"
              value={namaInstansi}
            />
          </div>
          <div className="mt-2">
            <button
              className="bg-[#012970] text-white rounded-lg py-2 px-4 text-lg w-full"
              onClick={addFolderLocal}
            >
              Buat Surat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalFolder;
