import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useParams } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { ROOT_FOLDER, useFolder } from "../hooks/useFolder";
import BreadCrumbs from "./BreadCrumbs";
import {
  AiFillFolderAdd,
  AiFillFileAdd,
  AiFillFolder,
  AiFillFile,
} from "react-icons/ai";
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
import { BsChevronDown } from "react-icons/bs";

function Incoming() {
  const { folderId } = useParams();
  const [user] = useAuthState(auth);
  const { folder, childFolders, childFiles } = useFolder(folderId);
  const [isModal, setIsModal] = useState(false);
  const [uploadFileState, setUploadFileState] = useState({
    progress: null,
    name: null,
    error: false,
  });

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
              });
            } else {
              await addDoc(collection(db, "files"), {
                url: downloadUrl,
                name: file.name,
                createdAt: serverTimestamp(),
                folderId: folder.id,
                userId: user.uid,
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
        <div className="dashboard">
          <div className="justify-between">
            <BreadCrumbs currentFolder={folder} />
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <label className="add-btn">
                <AiFillFileAdd />
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
              <button onClick={() => setIsModal(true)} className="add-btn">
                <AiFillFolderAdd />
              </button>
            </div>
          </div>
          <ModalFolder
            isModal={isModal}
            setIsModal={setIsModal}
            folder={folder}
          />
          <div className="bg-white shadow rounded-lg text-[#012970]">
            <div className="grid grid-cols-3 px-6 py-4 text-lg font-semibold">
              <div className="flex items-center gap-4">
                <span>Nama</span>
                <button>
                  <BsChevronDown />
                </button>
              </div>
              <div className="flex items-center gap-4">
                <span>Diubah</span>
                <button>
                  <BsChevronDown />
                </button>
              </div>
              <div className="flex items-center gap-4">
                <span>Ukuran File</span>
                <button>
                  <BsChevronDown />
                </button>
              </div>
            </div>
            {childFiles.length > 0 &&
              childFiles.map((childFile) => (
                <Link
                  key={childFile.id}
                  className="w-full grid grid-cols-3 px-6 py-4 hover:bg-[#DAE9FF] duration-200 ease-linear"
                  to={childFile.url}
                  target="_blank"
                >
                  <div className="flex items-center gap-3 text-lg font-medium">
                    <AiFillFile fontSize="1.75rem" />
                    <span>{childFile.name}</span>
                  </div>
                  <p>2 jam yang lalu</p>
                  <p>512 mb</p>
                </Link>
              ))}
            {childFolders.length > 0 &&
              childFolders.map((childFolder) => (
                <Link
                  key={childFolder.id}
                  className="w-full grid grid-cols-3 px-6 py-4 hover:bg-[#DAE9FF] duration-200 ease-linear"
                  to={`/folder/${childFolder.id}`}
                >
                  <div className="flex items-center gap-3 text-lg font-medium">
                    <AiFillFolder fontSize="1.75rem" />
                    <span>{childFolder.name}</span>
                  </div>
                  <p>2 jam yang lalu</p>
                  <p>512 mb</p>
                </Link>
              ))}
          </div>
          {uploadFileState.name || uploadFileState.progress ? (
            <div className="progress">
              <div
                className="justify-between"
                style={{ marginBottom: "1rem", gap: "1rem" }}
              >
                <h1 className="name">{uploadFileState.name}</h1>
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
                className="bar"
                style={{
                  width: `${uploadFileState.progress}%`,
                  backgroundColor: uploadFileState.error ? "red" : "blue",
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

export default Incoming;
