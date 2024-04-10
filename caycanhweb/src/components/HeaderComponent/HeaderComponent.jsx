
import React,{ useState,useEffect }from "react";
import "./HeaderComponent.css";
import { Link } from 'react-router-dom';
const HeaderComponent = ({flag,setFlag,isLog}) => {
  const [isOpenCayCanh, setIsOpenCayCanh] = useState(false);
  const [isOpenChauCanh, setIsOpenChauCanh] = useState(false);
  const [productTypes, setProductType] = useState([]);
  const [count,setCount] =useState(JSON.parse(localStorage.getItem('cart'))== null ? 0 :JSON.parse(localStorage.getItem('cart')).length);
  const handleMouseEnterCayCanh = () => {
    setIsOpenCayCanh(true);
  };
  const handleMouseLeaveCayCanh = () => {
    setIsOpenCayCanh(false);
  };
  const handleMouseEnterChauCanh = () => {
    setIsOpenChauCanh(true);
  };
  const handleMouseLeaveChauCanh = () => {
    setIsOpenChauCanh(false);
  };
  useEffect(() => {
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
    fetchProductTypes();
  }, []);
  useEffect(() => {
      if(flag==true)
      {
        if(JSON.parse(localStorage.getItem('cart'))!= null)
          setCount(JSON.parse(localStorage.getItem('cart')).length)
        else setCount(0)
        setFlag(false);
      }
  }, [flag]);
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

  return <>
  <div className="header container d-flex">
    <div className="header-logo col-3 d-flex">
      <img src="../../../logo.png" className="logo" alt="" />
      <div className="logo-Text d-flex flex-column justify-content-center">
          <div className="title">Vườn cây xinh</div>
          <div className="content">Không chỉ là trang trí</div>
      </div>
    </div>
    <div className="header-search col-5 d-flex flex-row justify-content-center align-items-center">
        <input type="text " class="input-search" placeholder="Search" autocomplete="off"/>
        <button class=" btn-search" type="submit">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-search" viewBox="0 0 18 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
        </button>
    </div>
    <div className="header-cart col-1 d-flex align-items-center">
        <Link to={"/gio-hang"} className="cart d-flex flex-row justify-content-center align-items-center">
          <div className="cart-Text">Giỏ hàng</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart3 cart-logo" viewBox="0 0 16 16">
             <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
          </svg>
          <div className="cart-count">({count})</div>
        </Link>
    </div>
    <div className="header-account col-3 d-flex flex-row ms-5 align-items-center">
      <div className="account d-flex flex-row justify-content-center align-items-center">
        {isLog==false?
        <>
          <Link to={"/dang-ky"} className="signup d-flex flex-row justify-content-start ps-3 align-items-center">Đăng ký</Link>
          <Link to={"/dang-nhap"} className="signin d-flex flex-row justify-content-center align-items-center">Đăng nhập</Link>
        </>: null
        }
        {isLog==true? <Link to={"/thong-tin-ca-nhan"} className="btn-account d-flex flex-row justify-content-center align-items-center">Tài khoản</Link>:null
        }
      </div>
    </div>
  </div>
  <nav class="navbar navbar-expand">
  <div class="container">
    <ul class="navbar-nav">
      <li class="nav-item">
        <Link to={"/trang-chu"} class="nav-link d-flex flex-row justify-content-center align-items-center" >Trang chủ</Link>
      </li>
      <li class="nav-item">
        <Link to={"/gioi-thieu"} class="nav-link d-flex flex-row justify-content-center align-items-center" >Giới thiệu</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link d-flex flex-row justify-content-center align-items-center" >Tin tức</Link>
      </li>
     <li class="nav-item dropdown" onMouseEnter={handleMouseEnterCayCanh} onMouseLeave={handleMouseLeaveCayCanh}>
        <Link to={formatPath("Cây Cảnh")} class="dropdown-toggle nav-link d-flex flex-row justify-content-center align-items-center" >
          Cây cảnh
        </Link>
        {isOpenCayCanh && (
        <div className="dropdown-menu-caycanh">
            {productTypes.map((item) =>{
              if (item["maDanhMuc"]=="PL71309576") {
                return(<Link to={formatPath(item["tenLoai"],item["maLoai"])} className="dropdown-item item-caycanh">{item["tenLoai"]}</Link>)
              }
            })}
        </div>
      )}
      </li>
      <li class="nav-item dropdown" onMouseEnter={handleMouseEnterChauCanh} onMouseLeave={handleMouseLeaveChauCanh}>
        <Link to={formatPath("Chậu Cảnh")} className="dropdown-toggle nav-link d-flex flex-row justify-content-center align-items-center" >
          Chậu cảnh
          </Link>
        {isOpenChauCanh && (
        <div className="dropdown-menu-chaucanh">
          {productTypes.map((item) =>{
              if (item["maDanhMuc"]=="PO67156722") {
                return(<Link to={formatPath(item["tenLoai"],item["maLoai"])} className="dropdown-item item-chaucanh">{item["tenLoai"]}</Link>)
              }
            })}
        </div>
      )}
      </li>
      <li class="nav-item">
        <Link class="nav-link d-flex flex-row justify-content-center align-items-center" >Dịch vụ</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link d-flex flex-row justify-content-center align-items-center" >Liên hệ</Link>
      </li>
    </ul>
  </div>
</nav>
  </>;
};

export default HeaderComponent;
