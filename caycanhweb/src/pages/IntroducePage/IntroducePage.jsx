import React from 'react';
import { Link } from 'react-router-dom';
import "./IntroducePage.css";
const IntroducePage = () => {
  return (
    <div className="container mt-3 mb-3 introduce-body d-flex  flex-wrap">
      <div id="demo" class="carousel slide col-6" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
          <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
        </div>

        <div class="carousel-inner">
          <Link class="carousel-item  item-1 active" ></Link>
          <Link class="carousel-item  item-2"></Link>
          <Link class="carousel-item  item-3"></Link>
        </div>
      </div>



      <Link to="/chuyen-muc/cay-canh" className="introduce-banner col-6">
      </Link>


      <Link  to="/chuyen-muc/cay-canh" className="banner-logo col-4 logo-plant ">
        <div className="logo-text d-flex justify-content-center align-items-center">Cây cảnh</div>
      </Link>
      <Link  to="/chuyen-muc/chau-canh" className="banner-logo-center logo-pot col-4 ">
      <div className="logo-text d-flex justify-content-center align-items-center">Chậu trồng cây</div>
        
      </Link>
      <Link className="banner-logo logo-guide col-4 ">
      <div className="logo-text d-flex justify-content-center align-items-center">Kiến thức cây cảnh</div>

      </Link>
    </div>
  )
}

export default IntroducePage
