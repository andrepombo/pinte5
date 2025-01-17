import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout/Layout";
import Login from "../pages/login/Login";
import Error from "../pages/error/Error";

// Context
import { useUserState } from "../context/UserContext";

export default function App() {
  const { isAuthenticated } = useUserState();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/app/dashboard" replace />} />
      <Route path="/app" element={<Navigate to="/app/dashboard" replace />} />
      <Route
        path="/app/*"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );

  function PrivateRoute({ children }) {
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  }

  function PublicRoute({ children }) {
    return isAuthenticated ? <Navigate to="/app/dashboard" replace /> : children;
  }
}
