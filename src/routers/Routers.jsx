import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import User from "../pages/user/User";
import Item from "../pages/item/Item";
import Form from "../pages/form/Form";
import Panel from "../pages/panel/Panel";
import { Toaster } from "sonner";

const Routers = () => {
  return (
    <>
      <Router>
        <Toaster richColors />
        <AuthProvider>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
            <Route
              path="users"
              element={
                <PrivateRoute requiredRole="ADMINISTRADOR">
                  <User />
                </PrivateRoute>
              }
            />
            <Route path="items" element={<Item />} />
            <Route path="forms" element={<Form />} />
            <Route path="panel" element={<Panel />} />
            <Route path="users" element={<User />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
};

export default Routers;
