import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./header/Header";
import { auth, db } from "./firebase";
import Post from "./posts/Post";
import ImageUploader from "./imageUploader/ImageUploader";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);

  const [open, setOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);

  // Sign Up function
  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((err) => alert(err.message));
    setEmail("");
    setPassword("");
    setUsername("");
    setSignUpOpen(false);
  };

  // Sign In function
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message))
      .then((res) => {
        setUser(res.user);
        setUsername(res.user.displayName);
      });
    setEmail("");
    setPassword("");
    setOpen(false);
  };

  // Logout functionality
  const logout = () => {
    auth.signOut();
  };

  // useEffect for fetching posts
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() }))
        );
      });
  }, []);

  return (
    <div className="app">
      <Header
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        signUp={signUp}
        signIn={signIn}
        username={username}
        setUsername={setUsername}
        open={open}
        setOpen={setOpen}
        signUpOpen={signUpOpen}
        setSignUpOpen={setSignUpOpen}
        user={user}
        logout={logout}
      />
      {user ? <ImageUploader username={user.displayName} /> : null}
      <div className="post-container">
        {posts.map((post) => (
          <Post
            username={post.post.username}
            key={post.id}
            id={post.id}
            imageUrl={post.post.imageUrl}
            caption={post.post.caption}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
