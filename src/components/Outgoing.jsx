import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useParams, useLocation } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { ROOT_FOLDER, useFolder } from "../hooks/useFolder";
import BreadCrumbs from "./BreadCrumbs";
import { AiFillFolder, AiFillFile } from "react-icons/ai";
import ModalFolder from "./ModalFolder";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import MainLayout from "./MainLayout";
import { BsChevronDown, BsPlus } from "react-icons/bs";

function Outgoing() {
  const { folderId } = useParams();
  const [user] = useAuthState(auth);
  const { folder, childFolders, childFiles } = useFolder(folderId);
  const [isModal, setIsModal] = useState(false);
  const [uploadFileState, setUploadFileState] = useState({
    progress: null,
    name: null,
    error: false,
  });
  const location = useLocation();

  const surat = childFolders.filter((data) => data.jenisSurat === "outgoing");

  function uploadFile(e) {
    const file = e.target.files[0];
    if (!folder || !file) return;

    const filePath =
      folder === ROOT_FOLDER
        ? `${folder.path.join("/")}/${file.name}`
        : `${folder.path.join("/")}/${folder.name}/${file.name}`;

    const storageRef = ref(storage, `/files/${user.uid}/${filePath}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadFileState({
          ...uploadFileState,
          name: file.name,
          progress: progress,
        });
        console.log("Upload is " + progress + "% done");
      },
      () => {
        setUploadFileState({
          name: file.name,
          progress: 100,
          error: true,
        });
      },
      () => {
        setUploadFileState({
          name: null,
          progress: null,
          error: false,
        });
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
          const q = query(
            collection(db, "files"),
            where("name", "==", file.name),
            where("userId", "==", user.uid),
            where("folderId", "==", folder.id)
          );

          getDocs(q).then(async (existingFiles) => {
            const existingFile = existingFiles.docs[0];
            if (existingFile?.exists()) {
              await updateDoc(existingFile.ref, {
                createdAt: serverTimestamp(),
                url: downloadUrl,
                size: Math.round(file.size / 1024),
              });
            } else {
              await addDoc(collection(db, "files"), {
                url: downloadUrl,
                name: file.name,
                createdAt: serverTimestamp(),
                folderId: folder.id,
                userId: user.uid,
                size: Math.round(file.size / 1024),
              });
            }
          });
        });
      }
    );
  }

  return (
    <MainLayout>
      <section id="incoming">
        <div>
          <div className="flex items-center justify-between mb-8">
            <BreadCrumbs currentFolder={folder} jenisSurat="Surat Keluar" />
            <div>
              <label
                className={`bg-[#012970] px-3 py-2 text-white flex gap-1 items-center rounded-lg text-lg hover:scale-90 duration-300 ease-linear cursor-pointer ${
                  location.pathname === "/outgoing" ? "hidden" : "inline"
                }`}
              >
                <BsPlus fontSize="1.75rem" />
                <span>Lampiran Baru</span>
                <input
                  type="file"
                  onChange={uploadFile}
                  style={{
                    opacity: "0",
                    position: "absolute",
                    left: "-9999px",
                  }}
                />
              </label>
              <button
                onClick={() => setIsModal(true)}
                className={`bg-[#012970] px-3 py-2 text-white flex gap-1 items-center rounded-lg text-lg hover:scale-90 duration-300 ease-linear ${
                  location.pathname === "/outgoing" ? "inline" : "hidden"
                }`}
              >
                <BsPlus fontSize="1.75rem" />
                <span>Surat Baru</span>
              </button>
            </div>
          </div>
          <ModalFolder
            isModal={isModal}
            setIsModal={setIsModal}
            folder={folder}
          />
          <div className="bg-white shadow rounded-lg text-[#012970]">
            {location.pathname === "/outgoing" && surat.length === 0 && (
              <p className="p-8 text-lg text-center">Surat masih kosong</p>
            )}
            {location.pathname !== "/outgoing" && childFiles.length === 0 && (
              <p className="p-8 text-lg text-center">Lampiran masih kosong</p>
            )}
            {childFiles.length > 0 || surat.length > 0 ? (
              <>
                <div className="grid grid-cols-3 gap-16 px-6 py-4 text-lg font-semibold border-b border-black/20">
                  <div className="flex items-center gap-4">
                    <span>
                      {location.pathname === "/outgoing"
                        ? "Nomor Surat"
                        : "Nama Lampiran"}
                    </span>
                    <button>
                      <BsChevronDown />
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>
                      {location.pathname === "/outgoing"
                        ? "Nama Instansi"
                        : "Ukuran Lampiran"}
                    </span>
                    <button>
                      <BsChevronDown />
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>Tanggal Dibuat</span>
                    <button>
                      <BsChevronDown />
                    </button>
                  </div>
                </div>
                {childFiles.length > 0 &&
                  childFiles.map((childFile) => {
                    const date = new Date(childFile.createdAt?.seconds * 1000);
                    return (
                      <Link
                        key={childFile.id}
                        className="w-full grid grid-cols-3 gap-16 px-6 py-4 hover:bg-[#DAE9FF] duration-200 ease-linear"
                        to={childFile.url}
                        target="_blank"
                      >
                        <div className="flex items-center gap-3 text-lg font-medium">
                          <AiFillFile fontSize="1.75rem" />
                          <span>{childFile.name}</span>
                        </div>
                        <p>{childFile.size.toLocaleString()} kb</p>
                        <p>{`${date.getDate()} ${date.toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            year: "numeric",
                          }
                        )}`}</p>
                      </Link>
                    );
                  })}
                {surat.length > 0 &&
                  surat.map((childFolder) => {
                    const date = new Date(
                      childFolder.createdAt?.seconds * 1000
                    );
                    return (
                      <Link
                        key={childFolder.id}
                        className="w-full grid grid-cols-3 gap-16 px-6 py-4 hover:bg-[#DAE9FF] duration-200 ease-linear"
                        to={`/outgoing/${childFolder.id}`}
                      >
                        <div className="flex items-center gap-3 text-lg font-medium">
                          <AiFillFolder fontSize="1.75rem" />
                          <p>{childFolder.nomorSurat}</p>
                        </div>
                        <p>{childFolder.namaInstansi}</p>
                        <p>
                          {`${date.getDate()} ${date.toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              year: "numeric",
                            }
                          )}`}
                        </p>
                      </Link>
                    );
                  })}
              </>
            ) : null}
          </div>
          {uploadFileState.name || uploadFileState.progress ? (
            <div className="absolute bottom-6 right-6 w-[350px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] rounded-lg p-4 z-10 bg-white">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h1>{uploadFileState.name}</h1>
                {uploadFileState.error ? (
                  <button
                    className="close"
                    onClick={() =>
                      setUploadFileState({
                        name: null,
                        progress: null,
                        error: false,
                      })
                    }
                  >
                    X
                  </button>
                ) : null}
              </div>
              <div
                className="rounded-[30px] text-white text-center duration-300 ease-linear"
                style={{
                  width: `${uploadFileState.progress}%`,
                  backgroundColor: uploadFileState.error ? "red" : "#012970",
                }}
              >
                {!uploadFileState.error
                  ? `${Math.round(uploadFileState.progress)}%`
                  : "Error"}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </MainLayout>
  );
}

export default Outgoing;
