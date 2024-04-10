import React from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsBoxArrowRight,
} from "react-icons/bs";

function AdminMenu({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="adminsidebar"
      className={openSidebarToggle ? "adminsidebar-responsive" : ""}
    >
      <div className="adminsidebar-title ">
        <div className="adminsidebar-brand">
          <BsCart3 className="adminicon_header" /> SHOP
        </div>
        <span className="adminicon adminclose_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="adminsidebar-list">
        <li className="adminsidebar-list-item">
          <a href="/Admin/dash">
            <BsGrid1X2Fill className="adminicon" /> Dashboard
          </a>
        </li>
        <li className="adminsidebar-list-item">
          <a href="/Admin/inventory">
            <BsFillArchiveFill className="adminicon" /> Products
          </a>
        </li>
        <li className="adminsidebar-list-item">
          <a href="/Admin/category">
            <BsFillGrid3X3GapFill className="adminicon" /> Categories
          </a>
        </li>
        <li className="adminsidebar-list-item">
          <a href="">
            <BsPeopleFill className="adminicon" /> Customers
          </a>
        </li>
        <li className="adminsidebar-list-item">
          <a href="/Admin/orders">
            <BsListCheck className="adminicon" /> Orders
          </a>
        </li>
        <li className="adminsidebar-list-item">
          <a href="/Admin/producttype">
            <BsMenuButtonWideFill className="adminicon" /> ProductTypes
          </a>
        </li>
        <li className="adminsidebar-list-item">
          <a href="/Admin/login">
            <BsBoxArrowRight className="adminicon" /> Logout
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default AdminMenu;
