import React from "react";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import AdminLayout from "../../layouts/adminlayout/AdminLayout";

import DashBoard from "../DashBoard/DashBoard";

function AdminPage({ children }) {
  if(localStorage.getItem("token"))
  {
    return <div>{children}</div>;
  }
}

export default AdminPage;
