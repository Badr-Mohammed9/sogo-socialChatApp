import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import css from "../CSS/groupChat.module.css";
import { UserContext } from "./UserContext";
import { useContext } from "react";

function MyDropzone({ mode, setPostData, postData }) {
  const { theme } = useContext(UserContext);

  const [droppedFile, setDroppedFile] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          const fileContents = reader.result;
          //   console.log(typeof file);
          setPostData({ ...postData, image: file });
          setDroppedFile(fileContents); // Save the file contents in state
        };
        reader.readAsDataURL(file); // Read the file as data URL
      });
    },
  });

  function showDropZone() {
    if (!droppedFile) {
      return (
        <div style={{ display: `${mode}`,backgroundColor:theme.primary }} className={css.imageInput}>
          <div
            style={{
              backgroundColor: theme.primary,
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
            <p style={{color:theme.text}}>Drop image, or click here</p>
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
