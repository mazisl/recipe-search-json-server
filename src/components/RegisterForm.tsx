import { useState } from "react";
import ModalOverlay from "./ModalOverlay";
import toast from "react-hot-toast";

import { useUsers } from "../contexts/users.context";

export const RegisterForm = () => {

  const {createUser, isLoading, setSelectedBtn} = useUsers();

  const [usernameInput, setUsernameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");

  return (
    <>
      <ModalOverlay onClose={() => setSelectedBtn(null)} />
      <div className="modal" id="register-form">
        <span className="close-btn" onClick={() => setSelectedBtn(null)}>
          &times;
        </span>
        <h2>Register</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createUser({
              username: usernameInput,
              password: passwordInput,
            })
              .then(() => {
                setUsernameInput("");
                setPasswordInput("");
              })
              .catch(() => toast.error("Could not create new user!"));
          }}
        >
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          <button className="reg-btn" type="submit" disabled={isLoading}>
            Register
          </button>
        </form>
      </div>
    </>
  );
};
