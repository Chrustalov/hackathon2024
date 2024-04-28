import React, { useCallback, useEffect, useRef, useState } from "react";
import { UploadCloud } from "./icons";
import axios from "axios";

function DropFoto({ className = "", url = "", setUrl }) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setFile(e.dataTransfer.files[0]);
  });

  useEffect(() => {
    if (file) {
      upLoadOnServer(file).then((url) => setUrl(url));
    }
  }, [file, setUrl]);

  useEffect(() => {
    if (!inputRef?.current?.files[0]) return;
    setFile(inputRef.current.files[0]);
  }, [inputRef, setFile]);

  const handleClick = useCallback(() => {
    inputRef.current.click();
  }, []);

  const handleFileChange = useCallback((event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    console.log("Вибраний файл:", selectedFile);
  }, []);

  return (
    <div
      className={
        "container-fluid align-content-center justify-content-center  p-4 " +
        className
      }
      accordion
      draggable
      onDragOver={(e) => {
        console.log("dragover");
        e.preventDefault();
      }}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      {!url ? (
        <div className="d-flex align-content-center justify-content-center text-center  flex-column dropzone py-4">
          <UploadCloud fill={"#000"} height="5rem" />
          <p>Drop your foto here</p>
        </div>
      ) : (
        <div className="container">
          <div
            className="row justify-content-center align-items-center"
            style={{ height: "300px" }}
          >
            <div className="col-auto">
              <img src={url} className="img-fluid" alt="uploaded foto" />
            </div>
          </div>
        </div>
      )}
      <input
        type="file"
        className="upload-input d-none"
        ref={inputRef}
        onChange={handleFileChange}
      />
    </div>
  );
}

async function upLoadOnServer(file) {
  if (!file) return;
  return await axios
    .post(
      process.env.REACT_APP_API + "/photo",
      { file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((resp) => {
      console.log(resp.data.url, "seve in server");
      return resp.data.url;
    })
    .catch((err) => {
      console.log(err);
      return URL.createObjectURL(file);
    });
}

export default DropFoto;
