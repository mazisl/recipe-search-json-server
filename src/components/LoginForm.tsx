import { useState } from "react";
import ModalOverlay from "./ModalOverlay";

interface LoginFormProps {
  login: (username: string, password: string) => void;
  isLoading: boolean;
  onClose: () => void;
}

export const LoginForm = ({login, isLoading, onClose}: LoginFormProps) => {
  
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");

  return (
    <>
      <ModalOverlay onClose={onClose} />
      <div className="modal" id="login-form">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <h2>Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login(usernameInput, passwordInput)
            setUsernameInput("");
            setPasswordInput("");
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
          <button className="login-btn" type="submit" disabled={isLoading}>
            Login
          </button>
        </form>
      </div>
    </>
  );
};
