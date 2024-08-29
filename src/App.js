import React from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/home";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
