import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../utils/utils";
import React from "react";

const Protected = () => {
  const token = getCookie("accessToken");

  return token ? <Outlet /> : <Navigate to="/signup" />;
};

export default Protected;
