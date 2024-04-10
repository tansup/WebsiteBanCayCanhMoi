import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./ConfirmPage.css";
const ConfirmPage = () => {
    const confirm = async ()  =>{
        const verifyElement = document.querySelector('.input-log-verify');
        if(verifyElement.value!="")
        {
            if(verifyElement.value== localStorage.getItem('logKey'))
            {
                try {
                    const response = await fetch("http://localhost:5000/api/v1/account/user/searchByEmail/"+localStorage.getItem('mail'), {
                        method: 'GET',
                    });
                
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                
                    const jsonData = await response.json();
                    if(jsonData && jsonData["message"])
                        {
                            localStorage.removeItem('logKey');
                            localStorage.removeItem('mail');
                            localStorage.setItem("username",jsonData["user"]["userName"])
                            window.location.href ="/trang-chu";
                        }
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
            else  alert("Mã xác nhận sai")
        }
        else{
            alert("Vui lòng nhập mã xác nhận")
        }
    }
  return (
    <div className="container confirm-body">
        <div className='confirm-title text-center'>
            XÁC MINH TÀI KHOẢN
        </div>
        <div className='box-verify'> 
            <div class="input-group flex-nowrap verify ">
                <span class="input-group-text" id="addon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-key" viewBox="0 0 16 16">
                        <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5"/>
                        <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                    </svg>
                </span>
                <input type="text" class="form-control input-log-verify"placeholder="Nhập mã xác nhận" aria-label="pass" aria-describedby="addon-wrapping"/>
            </div>
        </div>
        <div className='confirm-button'>
            <button className='confirm-btn-verify' onClick={() =>confirm()}>Xác nhận</button>
        </div>
    </div>
  )
}
export default ConfirmPage