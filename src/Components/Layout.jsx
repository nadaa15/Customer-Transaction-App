import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}
