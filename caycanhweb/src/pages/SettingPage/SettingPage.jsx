import React ,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./SettingPage.css";
import SettingComponent from '../../components/SettingComponent/SettingComponent';
const SettingPage = ({list,log,setIsLog,choice}) => {
    const [name,setName] =useState(localStorage.getItem("username")!=null?localStorage.getItem("username"):null)
  return (
    <div className="container setting-body">
        <div className='setting-title'>Tài Khoản</div>
        <div className='setting-box d-flex'>
            {renderMenuSetting(setIsLog,name,setName)}
            <SettingComponent choice={choice}/>
        </div>
    </div>
  )
}
function logOut(setIsLog,setName){
    setIsLog(false);
    localStorage.removeItem("log");
    localStorage.removeItem("username"); 
    setName(null);
}
function renderMenuSetting(setIsLog,name,setName) {
    return(
        <div className='setting-menu col-3'> 
            <div className='setting-menu-header d-flex'>
                <div className='setting-logo d-flex justify-content-center align-items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle logo-person-circle" viewBox="0 0 16 16">
                     <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                </svg>
                </div>
                <div className='setting-text d-flex justify-content-start align-items-center'>
                        {name}
                </div>
            </div>
            <div className='setting-menu-choice d-flex justify-content-start align-items-center'>
                <Link to={"/thong-tin-ca-nhan"}className='menu-choice-text'>Thông tin cá nhân</Link>
            </div>
            <div className='setting-menu-choice d-flex justify-content-start align-items-center'>
                <Link to={"/doi-mat-khau"}className='menu-choice-text'>Đổi mật khẩu</Link>
            </div>
            <div className='setting-menu-choice d-flex justify-content-start align-items-center'>
                <Link  to={"/lich-su-mua-hang"} className='menu-choice-text'>Đơn hàng của tôi</Link>
            </div>
            <div onClick={() =>logOut(setIsLog,setName)} className='setting-menu-choice d-flex justify-content-start align-items-center'>
                <Link to={"/trang-chu"}  className='menu-choice-text'>Thoát</Link>
            </div>
        </div>
    )
}
export default SettingPage