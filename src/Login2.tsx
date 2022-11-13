import React, { useState, useReducer } from "react";
import { login } from "./utils";

const initialState = {
  username: "",
  password: "",
  isLoading: false,
  error: "",
  isLoggedIn: false,
};

const logReducer = (state, action) => {
  switch (action.type) {
    case "field":
      return { ...state, [action.field]: action.value };
    case "login":
      return { ...state, error: "", isLoading: true };
    case "success":
      return { ...state, isLoggedIn: true };
    case "error":
      return {
        ...state,
        error: "Incorrect name or password",
        isLoading: false,
        password: "",
        username: "",
      };
    case "logout":
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};

const Login2 = () => {
  const [state, dispatch] = useReducer(logReducer, initialState);

  const { username, password, isLoading, error, isLoggedIn } = state;

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "login" });

    try {
      await login({ username, password });
      dispatch({ type: "success" });
    } catch (error) {
      dispatch({ type: "error" });
    }
  };

  return (
    <div className="App">
      <div className="login-container">
        {isLoggedIn ? (
          <>
            <h1>hello {username}</h1>
            <button onClick={() => dispatch({ type: "logout" })}>
              log out
            </button>
          </>
        ) : (
          <form onSubmit={onSubmit} className="form">
            {error && <p className="error">{error}</p>}
            <input
              type="text"
              value={username}
              onChange={(e) =>
                dispatch({
                  type: "field",
                  field: "username",
                  value: e.target.value,
                })
              }
              placeholder="username"
            />
            <input
              type="password"
              value={password}
              onChange={(e) =>
                dispatch({
                  type: "field",
                  field: "password",
                  value: e.target.value,
                })
              }
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

export default Login2;
