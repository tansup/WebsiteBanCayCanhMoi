import React from "react";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";
function AdminHeader() {
  return (
    <header className="adminheader">
      <div className="adminmenu-icon">
        <BsJustify className="adminicon" />
      </div>
      <div className="adminheader-left">
        <BsSearch className="adminicon" />
      </div>
      <div className="adminheader-right">
        <BsFillBellFill className="adminicon" />
        <BsFillEnvelopeFill className="adminicon" />
        <BsPersonCircle className="adminicon" />
      </div>
    </header>
  );
}
export default AdminHeader;
