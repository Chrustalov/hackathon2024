import React from "react";
import { UploadCloud } from "./icons";

function DropFoto({ className = "", url = "logo192.png", setUrl }) {
  return (
    <div
      className={
        "container-fluid align-content-center justify-content-center  p-4 " +
        className
      }
      accordion
      draggable
      onDragExit={(e) => console.log("drag exit")}
      onDragOver={(e) => console.log("drag over")}
      onDragStart={(e) => console.log("drag start")}
      onDrop={(e) => console.log("drop")}
    >
      {!url ? (
        <div class="d-flex align-content-center justify-content-center text-center  flex-column dropzone pt-4">
          <UploadCloud fill={"#000"} height="5rem" />
          <input type="file" class="upload-input fade " />
        </div>
      ) : (
        <div
            // class="d-flex align-content-center justify-content-center text-center  flex-column p-5"
            // style={{
            //     backgroundImage: `url(${url})`,
            //     backgroundSize: "cover",
            //     backgroundPosition: "center",
            // }}
        >
            <image src={url} alt="uploaded" className="image-fluid"  />
        </div>
      )}
      <button type="button" class="btn btn-outline-dark " name="uploadbutton">
        Upload file
      </button>
    </div>
  );
}

export default DropFoto;
