import React, { useState } from "react";
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import { Space } from "antd";
import "./AdminLayout.css";
const AdminLayout = ({ children }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="admingrid-container adminbody ">
      <AdminHeader OpenSidebar={OpenSidebar} />
      <AdminMenu
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      {children}
    </div>
  );
};

export default AdminLayout;
