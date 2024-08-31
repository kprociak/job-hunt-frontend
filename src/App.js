import React from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import {Provider as ReduxProvider} from "react-redux";
import store from "./redux/store";
import {FlashMessageProvider} from "./components/flashMessages/FlashMessagePovider";
import FAQPage from "./pages/FAQPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/faq",
    element: <FAQPage />,
  }

])

function App() {
  return (
    <ReduxProvider store={store}>
      <FlashMessageProvider>
        <RouterProvider router={router} />
      </FlashMessageProvider>
    </ReduxProvider>
  );
}

export default App;
