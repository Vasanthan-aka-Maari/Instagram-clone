import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Post.css";
import { db } from "../firebase";
import firebase from "firebase";

function Post({ username, id, imageUrl, caption, user }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // function to post comment
  const commentHandler = () => {
    db.collection("posts").doc(id).collection("comments").add({
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      comment,
    });
    setComment("");
  };

  // function to fetch comments
  useEffect(() => {
    db.collection("posts")
      .doc(id)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()));
      });
    setComments([]);
  }, [id]);

  return (
    <div className="post">
      <div className="post-header">
        <p className="post-username">{username}</p>
      </div>
      <img className="post-img" src={imageUrl} alt="" />
      <div className="post-body">
        <p className="post-caption">
          <span>{username}</span>
          {caption}
        </p>
        {comments.map((comment) => (
          <p className="comment">
            <b>{comment.username} </b>
            {comment.comment}
          </p>
        ))}
        {user ? (
          <div className="comment-form">
            <TextField
              size="small"
              variant="outlined"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              className="comment-input"
              placeholder="add a comment"
            />
            <Button
              disabled={!comment}
              variant="outlined"
              size="small"
              onClick={commentHandler}
            >
              Post
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Post;
