import React, { useCallback, useRef } from "react";
import { UploadCloud } from "./icons";

function DropFoto({ className = "", file, setFile }) {
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFile(e.dataTransfer.files[0]);
  }

  const handleClick = useCallback(() => {
    inputRef.current.click();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    console.log("Вибраний файл:", selectedFile);
  };

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
      {!file ? (
        <div className="d-flex align-content-center justify-content-center text-center  flex-column dropzone py-4">
          <UploadCloud fill={"#000"} height="5rem" />
          <p>Drop your foto here</p>
        </div>
      ) : (
        <div className="container dropzone">
          <div
            className="row justify-content-center align-items-center"
            style={{ height: "300px" }}
          >
            <div className="col-auto">
              <img
                src={file ? URL.createObjectURL(file) : ""}
                className="img-fluid"
                alt="uploaded foto"
              />
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

export default DropFoto;
