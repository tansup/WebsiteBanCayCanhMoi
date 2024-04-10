import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./AccountPage.css";
const AccountPage = ({type}) => {
    const log = async () => {
        const userNameElement = document.querySelector('.input-log-name');
        const passWordElement= document.querySelector('.input-log-pass');
        try {
            const response = await fetch("http://localhost:5000/api/v1/account/user/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: userNameElement.value,
                    passWord: passWordElement.value
                })
            });
        
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        
            const jsonData = await response.json();
            if(jsonData && jsonData["token"])
                {
                    // localStorage.setItem("log",jsonData["token"])
                    localStorage.setItem("username",userNameElement.value)
                    window.location.href ="/trang-chu";
                }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const register = async () => {
        const nameElement = document.querySelector('.input-name-logup');
        const passElement= document.querySelector('.input-pass-logup');
        const emailElement = document.querySelector('.input-email-logup');
        const phoneElement= document.querySelector('.input-phone-logup');
        const recaptchaElement = document.querySelector('.input-captcha-logup');
        const captchaElement = document.querySelector('.input-catcha-verify');
        if (captchaElement.value.toLowerCase() === recaptchaElement.value.toLowerCase()) {
            try {
                const response = await fetch("http://localhost:5000/api/v1/account/user/register", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userName: nameElement.value,
                        passWord: passElement.value,
                        email: emailElement.value,
                        phone: phoneElement.value
                    })
                });
            
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
            
                const jsonData = await response.json();
                if(jsonData["account"])
                    {
                        resetInput()
                        try {
                            const response = await fetch("http://localhost:5000/api/v1/account/user/login", {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    userName: jsonData["account"]["userName"],
                                    passWord: jsonData["account"]["password"]
                                })
                            });
                        
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                        
                            const jsonData1 = await response.json();
                            if(jsonData1 && jsonData1["token"])
                                {
                                    localStorage.setItem("log",jsonData1["token"])
                                    window.location.href ="/trang-chu";
                                }
                        } catch (error) {
                            console.error("Error fetching data:", error);
                        }
                    }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        } else {
        alert("Thông tin bị sai")
        }

    };
    const takepass = async () => {
        const emailElement = document.querySelector('.input-email-change');
        try {
            const response = await fetch("http://localhost:5000/api/v1/account/resetPassword", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailElement.value,
                })
            });
        
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        
            const jsonData = await response.json();
            if(jsonData && jsonData["message"])
                {
                    localStorage.setItem('logKey',jsonData["message"]);
                    localStorage.setItem('mail',emailElement.value);
                    window.location.href ="/xac-minh";
                }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

  return (
    <div className="container account-body">
        {renderTitle(type)}
        <div className='account-form d-flex'>
        {renderForm(type)}
        {renderOtherLog(type)}
        </div>
        {renderbutton(type,log,register,takepass)}
    </div>
  )
}
function renderTitle(type) {
    let str ="";
    if (type==0) {
        str="ĐĂNG NHẬP"
    } else if(type==1)
    {
        str="TẠO TÀI KHOẢN"
    }else str="QUÊN MẬT KHẨU"
    return(
        <div className='account-title'>
            {str}
            {type==1&&
            <label className='account-content'>
                Bạn đã có tài khoản?  <Link to={"/dang-nhap"} className='content-link'>Đăng nhập</Link>
            </label>}
        </div>
    )
    
}
function renderForm(type) {
    if (type==0) {
        return(
        <div className='form-log col-6 d-flex flex-column justify-content-center align-items-center'>
                 <div class="input-group flex-nowrap name">
                <span class="input-group-text" id="addon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                </svg>
                </span>
                <input type="text" class="form-control input-log-name"  placeholder="Nhập tên tài khoản,..." aria-label="name" aria-describedby="addon-wrapping"/>
                </div>
            <div class="input-group flex-nowrap pass">
                <span class="input-group-text" id="addon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-key" viewBox="0 0 16 16">
                        <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5"/>
                        <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                    </svg>
                </span>
                <input type="password" class="form-control input-log-pass"placeholder="Nhập Mật khẩu...." aria-label="pass" aria-describedby="addon-wrapping"/>
             </div>
        </div>
       )
    } else if(type==1)
    {
        return(
            <div className='form-log col-6 d-flex flex-column justify-content-center align-items-center'>
                 <div class="input-group flex-nowrap name">
                <span class="input-group-text" id="addon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                </svg>
                </span>
                <input type="text" class="form-control input-name-logup" placeholder="Nhập tên tài khoản,..." aria-label="name" aria-describedby="addon-wrapping"/>
                </div>
                <div class="input-group flex-nowrap pass">
                        <span class="input-group-text" id="addon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-key" viewBox="0 0 16 16">
                                <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5"/>
                                <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                            </svg>
                        </span>
                        <input type="password" class="form-control input-pass-logup" placeholder="Nhập Mật khẩu...." aria-label="pass" aria-describedby="addon-wrapping"/>
                </div>
                <div class="input-group flex-nowrap email">
                        <span class="input-group-text" id="addon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                        </svg>
                        </span>
                        <input type="text" class="form-control input-email-logup" placeholder="Nhập Email...." aria-label="mail" aria-describedby="addon-wrapping"/>
                </div>
                <div class="input-group flex-nowrap phone">
                <span class="input-group-text" id="addon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
                        <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                    </svg>
                </span>
                <input type="text" class="form-control input-phone-logup" placeholder="Nhập số điện thoại...." aria-label="phone" aria-describedby="addon-wrapping"/>
                </div>
                <div class="captcha d-flex">
                    <div className='input-group flex-nowrap'>
                    <span class="input-group-text" id="addon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-patch-check" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                            <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z"/>
                        </svg>
                    </span>
                    <input type="text" class="form-control input-captcha-logup" placeholder="Nhập mã Captcha...." aria-label="captcha" aria-describedby="addon-wrapping"/>
                    </div>
                    <input className='captcha-text  text-center input-catcha-verify' type="text" value={randomCaptcha()} disabled readOnly/>
                </div>
            </div>
       )
    }else {
        return(
            <div className='form-log col-6 col-6 d-flex flex-column justify-content-center align-items-center'>
                <div class="input-group flex-nowrap email">
                        <span class="input-group-text" id="addon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                        </svg>
                        </span>
                        <input type="text" class="form-control input-email-change" placeholder="Nhập Email...." aria-label="mail" aria-describedby="addon-wrapping"/>
                </div>
                <div className='form-note'>Email đăng ký: địa chỉ email lúc đăng ký.<br/>
                Nếu thông tin hợp lệ, mã xác nhận của bạn sẽ được gởi đến địa chỉ email này.</div>
            </div>
       )
    }

}
function renderOtherLog(type) {
    return(
        <div className='other-log col-6 d-flex flex-column justify-content-center align-items-center'>
                <div className='other-log-content'>Đăng nhập bằng tài khoản mạng xã hội</div>
                <button className='other-log-choice choice-f d-flex'>
                    <div className="choice-logo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                        </svg>
                    </div>
                    <div className="choice-content d-flex  justify-content-center align-items-center">Đăng nhập với FaceBook</div>
                </button>
                <button className='other-log-choice choice-g d-flex '>
                    <div className="choice-logo ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                            <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
                        </svg>
                    </div>
                    <div className="choice-content d-flex  justify-content-center align-items-center" >Đăng nhập với Google</div>
                </button>
        </div>
    )
}
function renderbutton(type,log,register,takepass) {
    if (type==0) {
        return(
        <div className='account-button'>
            <button className='account-btn-log' onClick={() =>log()}>Đăng nhập</button>
            <div className='account-link'>
                <Link className='link-takepass' to={"/quen-mat-khau"} >Quên mật khẩu</Link>
                <Link className='link-logup' to={"/dang-ky"}>Đăng ký</Link>
            </div>
            
        </div>
       )
    } else if(type==1)
    {
        return(
        <div className='account-button'>
            <button className='account-btn-delete' onClick={()=>resetInput()}>Reset</button>
            <button className='account-btn-logup' onClick={() =>register()}>Đăng ký</button>
        </div>
       )
    }else {
        return(
        <div className='account-button'>
            <button className='account-btn-delete' onClick={()=>resetEmailChange()}>Reset</button>
            <button className='account-btn-takepass' onClick={()=>takepass()}>Gửi</button>
            <div className='account-link'>
                <Link className='link-login' to={"/dang-nhap"}>Đăng nhập</Link>
                <Link className='link-logup'to={"/dang-ky"}>Đăng ký</Link>
            </div>
        </div>
       )
    } 
}
function randomCaptcha() {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let captcha = '';
        for (let i = 0; i < 5; i++) {
            captcha += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return captcha
}
function resetInput() {
    const nameElement = document.querySelector('.input-name-logup');
    const passElement= document.querySelector('.input-pass-logup');
    const emailElement = document.querySelector('.input-email-logup');
    const phoneElement= document.querySelector('.input-phone-logup');
    const captchaElement = document.querySelector('.input-captcha-logup');
     nameElement.value =""
     passElement.value=""
     emailElement.value=""
     phoneElement.value=""
     captchaElement.value=""
}
function resetEmailChange() {
    const emailElement = document.querySelector('.input-email-change');
     emailElement.value="";
}
export default AccountPage