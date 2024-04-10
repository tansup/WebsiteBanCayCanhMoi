import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MenuComponent.css";
const MenuComponent = () => {
  const [categories, setCategories] = useState([]);
  const [productTypes, setProductType] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/category");
        const jsonData = await response.json();
        setCategories(jsonData["categories"]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchProductTypes = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/producttype"
        );
        const jsonData = await response.json();
        setProductType(jsonData["producttypes"]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCategories();
    fetchProductTypes();
  }, []);
  function formatPath(inputString,type) {
    let str=inputString;
    str= str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    str= str.toLowerCase().replace(/\s+/g, '-');
    if (type!=undefined) {
      str ="/chuyen-muc/"+str+"/"+type;
    }
    else str ="/chuyen-muc/"+str;
    return str;
}
  return <div className="menu col-3">
    {categories.map((category,index) =>(
        <div key={category["maDanhMuc"]} className="menu-category" >
              <Link to={formatPath(category["tenDanhMuc"])} className="category-name d-flex flex-column justify-content-center align-items-start">{category["tenDanhMuc"]}</Link>
              <div className="category-list d-flex flex-column justify-content-end align-items-center">
              {productTypes.map((type) =>(
                type["maDanhMuc"] == category["maDanhMuc"]  && <Link to={formatPath(type["tenLoai"],type["maLoai"])} className="type-item" key={type["maLoai"]}>{type["tenLoai"]}</Link>
              ))}
              </div>
        </div>
        
    ))}
    </div>;
};


export default MenuComponent;
