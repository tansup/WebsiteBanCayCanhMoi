import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./FooterComponent.css";
const FooterComponent = () => {
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
  return <div className="container-fluid footer">
    <div className="container d-flex">
      <div className="col-4">
        <div className="footer-title">THÔNG TIN</div>
        <div className="footer-content d-flex flex-column">
              <div className="content-address d-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-house-door address-icon" viewBox="0 0 16 16">
                  <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
                </svg>
                <div className="address-text">Địa chỉ: Đại học Công nghệ sài gòn, 180 Cao lỗ, Phường 4, Quận 8, TP Hồ Chí Minh</div>
              </div>
              <div className="content-person d-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-person person-icon" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                </svg>
                <div className="person-text">Người đại diện: Nguyễn Văn Bảo</div>
              </div>
              <div className="content-mail d-flex">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope mail-icon" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
              </svg>
                <div className="mail-text">Email: vuoncayxinh@gmail.com</div>
              </div>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.954410425894!2d106.67525717589449!3d10.737997189408416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f62a90e5dbd%3A0x674d5126513db295!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgU8OgaSBHw7Ju!5e0!3m2!1svi!2s!4v1712081370430!5m2!1svi!2s" width="390" height="245"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
      <div className="col-4">
        <div className="footer-title">DANH MỤC CÁC SẢN PHẨM</div>
        <div className="footer-content d-flex flex-column">
<div>
      {categories.map((item) => (
        <div key={item["maDanhMuc"]}>
          <Link className="name-list">{item["tenDanhMuc"]}</Link>
            <ul>
            {productTypes.map((productType) =>(
              productType["maDanhMuc"] == item["maDanhMuc"]  && <li  key={productType["maLoai"]}><Link className="list-item">{productType["tenLoai"]}</Link></li>
            ))}
            </ul>
        </div>
      ))}
    </div>

        </div>
      </div>
      <div className="col-4">
        <div className="footer-title">CHÍNH SÁCH</div>
        <div className="footer-content d-flex flex-column">
          <div className="content-row d-flex flex-row">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill row-icon" viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg>
            <div className="row-content">Bảo hành 14 ngày từ khi nhận hàng</div>
          </div>
          <div className="content-row d-flex flex-row">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill row-icon" viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg>
            <div className="row-content">Hỗ trợ chăm sóc trọn đời</div>
          </div>
          <div className="content-row d-flex flex-row" >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill row-icon" viewBox="0 0 16 16">
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg>
            <div className="row-content">Giao hàng tận nơi</div>
          </div>
        </div>
      </div>
    </div>
  </div>;
};

export default FooterComponent;
