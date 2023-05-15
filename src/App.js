import React from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router, routerAuth } from "./router";
import { useSelector } from "react-redux";
import { getAuth } from "./redux/auth/authSlice";

function App() {
  const { authenticated } = useSelector(getAuth);
  return <RouterProvider router={authenticated ? routerAuth : router} />;
}

export default App;
