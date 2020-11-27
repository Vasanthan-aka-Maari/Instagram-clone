import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { storage, db } from "../firebase";
import firebase from "firebase";
import "./ImageUploader.css";

function ImageUploader({ username }) {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  // function to set image
  const changeHandler = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // function to upload image
  const uploadHandler = (e) => {
    if (image && caption) {
      const UploadTask = storage.ref(`images/${image.name}`).put(image);

      return UploadTask.on(
        "state_changed",
        // progress function
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        // error function
        (err) => {
          alert(err.message);
        },
        // complete function
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("posts").add({
                username,
                imageUrl: url,
                caption,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              });

              setImage(null);
              setCaption("");
              setProgress(0);
            });
        }
      );
    } else {
      return alert("Please add an Image and a Caption");
    }
  };

  return (
    <div className="imageUploader">
      <div className="imageUploader-head">
        <TextField
          size="small"
          variant="outlined"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          color="primary"
          label="caption"
          className="imageUploader-input"
        />
        <input
          className="fileUploader"
          type="file"
          accept="image/*"
          onChange={changeHandler}
        />
      </div>
      <Button onClick={uploadHandler} variant="contained" color="primary">
        Upload
      </Button>
      <progress className="imageUpload-Progress" value={progress} max="100" />
    </div>
  );
}

export default ImageUploader;
