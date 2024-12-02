import { NotFound } from "./components/NotFound";
import { Register } from "./auth/Register";
import { AuthLayout } from "./auth/AuthLayout";
import { MainLayout } from "./MainLayout";
import { Login } from "./auth/Login";
import { createBrowserRouter } from "react-router-dom";
import { ForgotPassword } from "./auth/ForgotPassword";
import { ResetPassword } from "./auth/ResetPassword";
import { VerifyEmail } from "./auth/VerifyEmail";
import { Navbar } from "./components/Navbar";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "*",
        element: <NotFound path="/auth/login" />,
      },
    ],
  },
]);
