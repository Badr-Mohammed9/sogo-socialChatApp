import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import css from "../CSS/groupChat.module.css";


function MyDropzone({ mode,setPostData,postData }) {

  const [droppedFile, setDroppedFile] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const fileContents = reader.result;
          //   console.log(typeof file);
          setPostData({...postData,image:file})
          setDroppedFile(fileContents); // Save the file contents in state
        };
        reader.readAsDataURL(file); // Read the file as data URL
      });
    },
  });

  function showDropZone() {
    if (!droppedFile) {
      return (
        <div style={{ display: `${mode}` }} className={css.imageInput}>
          <div
            style={{
              backgroundColor: "",
              width: "80%",
              height: "80%",
              margin: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              outline: "1px dashed #00ABB3",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <p>Drop image, or click here</p>
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{ height: "25%", display: `${mode}` }}
          className={css.imageInput}
        >
          <div
            style={{
              backgroundColor: "",
              maxWidth: "100%",
              height: "100%",
              margin: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              outline: "1px dashed #00ABB3",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <img
              src={droppedFile}
              alt="Dropped"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
        </div>
      );
    }
  }
  return <>{showDropZone()}</>;
}

export default MyDropzone;
