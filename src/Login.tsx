import React, { useState } from "react";
import { login } from "./utils";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await login({ username, password });
      setIsLoggedIn(true);
      setUsername("")
      setPassword("")
      setError("")
    } catch (error) {
      setError("Incorrect name or password");
    }
    setIsLoading(false);
  };

  return (
    <div className="App">
      <div className="login-container">
        {isLoggedIn ? (
          <>
          <h1>hello {username}</h1>
          <button onClick={() => setIsLoggedIn(false)}>log out</button>
          </>
        ) : (
          <form onSubmit={onSubmit} className="form">
            {error && <p className="error">{error}</p>}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
            <button type="submit" disabled={isLoading} className="submit">
              {isLoading ? "Logging in" : "Log in"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
