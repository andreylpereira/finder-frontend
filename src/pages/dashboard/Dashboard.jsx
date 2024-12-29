import React from "react";
import NavHeader from "../../components/NavHeader";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
<div style={{ backgroundColor: '#E2EEFF' }}>
  <NavHeader />
  <Outlet />
</div>
    </>
  );
};

export default Dashboard;
