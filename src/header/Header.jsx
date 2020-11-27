import React from "react";
import "./Header.css";
import { Button, Modal, TextField } from "@material-ui/core";

function Header(props) {
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    signUp,
    signIn,
    open,
    setOpen,
    signUpOpen,
    setSignUpOpen,
    user,
    logout,
  } = props;

  return (
    <>
      {/* Sign in Modal */}
      <Modal
        open={open}
        onClose={(e) => {
          setOpen(false);
        }}
      >
        <form className="modal-form" onSubmit={signIn}>
          <h1 className="modal-heading">Sign In</h1>
          <TextField
            autoFocus
            label="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            variant="filled"
            className="form-input"
          />
          <TextField
            label="password "
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            variant="filled"
            className="form-input"
          />
          <Button type="submit" variant="contained" color="primary">
            Sign In
          </Button>
        </form>
      </Modal>

      {/* Sign Up Modal */}
      <Modal
        open={signUpOpen}
        onClose={(e) => {
          setSignUpOpen(false);
        }}
      >
        <form className="modal-form" onSubmit={signUp}>
          <h1 className="modal-heading">Sign Up</h1>
          <TextField
            label="username"
            value={username}
            autoFocus
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            variant="filled"
            className="form-input"
          />
          <TextField
            label="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            variant="filled"
            className="form-input"
          />
          <TextField
            label="password "
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            variant="filled"
            className="form-input"
          />
          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
        </form>
      </Modal>

      {/* Form */}
      <div className="header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="instgram"
          className="logo"
        />
        {user ? (
          <div className="button-container">
            <p className="user-welcome">{`Welcome, ${user.displayName}`}</p>
            <button className="logout-btn" onClick={logout}>
              Log Out
            </button>
          </div>
        ) : (
          <div className="button-container">
            <button onClick={(e) => setOpen(true)}>Sign In</button>
            <button onClick={(e) => setSignUpOpen(true)}>Sign Up</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
