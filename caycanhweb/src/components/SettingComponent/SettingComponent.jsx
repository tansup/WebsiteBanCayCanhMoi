import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SettingComponent.css";
const SettingComponent = ({choice}) => {
  const [name,setName] =useState(localStorage.getItem("username")!=null?localStorage.getItem("username"):null)
  const [infoAccount,setInfoAccount] =useState(null)
  const [list,setList] =useState([])

  useEffect(() => {
    const fetchInfoAccount = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/account/user/"+name);
        const jsonData = await response.json();
        setInfoAccount(jsonData["user"]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchList = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/order/searchByUsername/"+localStorage.getItem("username"));
        const jsonData = await response.json();
        setList(jsonData["orders"]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchList();
    fetchInfoAccount();
  }, [infoAccount]);
  console.log(list);
  return(
    <div className="setting-menu-form col-9">
      {renderTile(choice)}
      {renderMenuForm(choice,list,infoAccount)}
      {renderbutton(choice,infoAccount)}
    </div>
  )
};
function renderTile(choice) {
  if (choice==0) {
    return(
          <div className="setting-title d-flex justify-content-center align-items-center " > 
              THÔNG TIN TÀI KHOẢN
        </div>
    )

  } else if(choice==1)
  {
    return(
      <div className="setting-title d-flex justify-content-center align-items-center "> 
            THAY ĐỔI MẬT KHẨU
      </div>
    )
  }else{
    return(
      <div className="setting-title d-flex justify-content-center align-items-center "> 
            ĐƠN HÀNG CỦA TÔI
      </div>
      )
  }
}
function renderMenuForm(choice,list,infoAccount) {
  if (choice==0) {
    return(
          <div className="info-form"> 
            <div className="input-title">Tên đăng nhập</div>
            <div class="input-group mb-2 ">
                <div class="input-group-prepend">
                    <span class="input-group-text info-setting-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                    </svg>
                    </span>
                </div>
                <input choice="text" class="form-control input-info-setting input-change-name"  placeholder={infoAccount ? infoAccount["userName"]:""} disabled/>
            </div>
            <div className="input-title">Email</div>
            <div class="input-group mb-2 ">
                <div class="input-group-prepend">
                    <span class="input-group-text info-setting-logo">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                      </svg>
                    </span>
                </div>
                <input choice="text" class="form-control input-info-setting input-change-email"  placeholder={infoAccount ? infoAccount["email"] :""}/>
            </div>
            <div className="input-title">Điện thoại</div>
            <div class="input-group mb-2 ">
                <div class="input-group-prepend">
                    <span class="input-group-text info-setting-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
                        <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                    </svg>
                    </span>
                </div>
                <input choice="text" class="form-control input-info-setting input-change-phone"   placeholder={infoAccount ? infoAccount["phone"] :""}/>
            </div>
        </div>
    )
  } else if(choice==1)
  {
    return(
      <div className="info-form"> 
        <div className="input-title">Mật khẩu cũ</div>
        <div class="input-group mb-2 ">
            <div class="input-group-prepend">
                <span class="input-group-text info-setting-logo">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                </svg>
                </span>
            </div>
            <input type="password" class="form-control input-change-pass" placeholder="Mật khẩu cũ"/>
        </div>
        <div className="input-title">Mật khẩu mới</div>
        <div class="input-group mb-2 ">
            <div class="input-group-prepend">
                <span class="input-group-text info-setting-logo">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                </svg>
                </span>
            </div>
            <input type="password" class="form-control input-pass-new" placeholder="Mật khẩu mới" />
        </div>
        <div className="input-title">Xác nhận mật khẩu</div>
        <div class="input-group mb-2 ">
            <div class="input-group-prepend">
                <span class="input-group-text info-setting-logo">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                </svg>
                </span>
            </div>
            <input type="password" class="form-control input-change-repass" placeholder="Xác nhận mật khẩu"/>
        </div>
    </div>
    )
  }else{
    return(
      <div className="setting-form"> 
          {renderOrder(list)}
        </div>
      )
  }
  
}
function renderbutton(choice,infoAccount) {
  if (choice==0) {
      return(
      <div className='setting-button'>
          <div className='setting-button'>
            <button className='setting-btn-reset-info' onClick={()=>changeInfo(infoAccount,0)}>Reset</button>
            <button className='setting-btn-change-info'onClick={()=>changeInfo(infoAccount,1)} >Cập nhật</button>
          </div>
          
      </div>
     )
  }else if(choice==1)
  {
    return(
      <div className='setting-button'>
          <div className='setting-button'>
            <button className='setting-btn-reset-pass' onClick={()=>changePass(infoAccount,0)}>Reset</button>
            <button className='setting-btn-change-pass'onClick={()=>changePass(infoAccount,1)} >Cập nhật</button>
          </div>
          
      </div>
     )
  }else {
      return(
      <></>
     )
  } 
}
function formatPrice(price) {
  let strNum ="Đ";
  let phandu;
  let phannguyen=parseInt(price)
  while (phannguyen/1000>=1) {
      phandu = phannguyen%1000;
      phannguyen = (phannguyen-phandu)/1000;
      if (phandu===0) {
        strNum= ",000"+strNum;
      }
      else
      { 
          if(phandu.toString().length===3)
            strNum= ","+phandu.toString()+strNum;
          else if(phandu.toString().length===2)
            strNum= ",0"+phandu.toString()+strNum;
          else strNum= ",00"+phandu.toString()+strNum;
      }

  }
  strNum= phannguyen.toString()+strNum;
  return strNum;
}
function renderOrder(list) {
  return(
      <div className='setting-order '>
          <div className='order-list'>
          <table class="table">
                  <thead className='table-header'>
                      <tr >
                      <th className='order-text text-center'>STT</th>
                      <th className='order-text text-center '>tên người nhận</th>
                      <th className='order-text text-center'>Số điện thoại</th>
                      <th className='order-text text-center'>Tổng tiền</th>
                      <th className='order-text text-center'>Trạng thái</th>
                      </tr>
                  </thead>
                  {
                        list && list.length > 0 ? (
                        list.map((item, index) => (
                          <tr className='order-table-row'>
                          <td className='order-text text-center'>{index+1}</td>
                          <td className='order-text text-start'>{item["address"]}</td>
                          <td className='order-text text-center'>{item["phone"]}</td>
                          <td className='order-text text-center'>{formatPrice(item["totalCost"])}</td>
                          <td className='order-text text-center'>{item["status"]==true?"Đã thanh toán" : " Chưa thanh toán"}</td>
                          </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan="6" className='text-center'>Không có dữ liệu</td>
                        </tr>
                    )
                    }
              </table>
          </div>
      </div>
     )
}
async function changeInfo(infoAccount,type){
  const mailElement = document.querySelector('.input-change-email');
  const phoneElement = document.querySelector('.input-change-phone');
  if(mailElement.value.length==0||phoneElement.value.length==0)
  {
     alert("Vui lòng nhập dữ liệu đúng")
     mailElement.value= infoAccount["email"]
     phoneElement.value=infoAccount["phone"]
  }else
  {
    if (type==0) {
      mailElement.value= infoAccount["email"]
      phoneElement.value=infoAccount["phone"]
    }
    else{
      try {
        const response = await fetch("http://localhost:5000/api/v1/account//user/updateProfile/"+infoAccount["userName"], {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: mailElement.value,
            phone: phoneElement.value
          })
      });
      const jsonData = await response.json();
      if(jsonData)
      {
        alert("Cập nhật thành công")
      }
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      } catch (error) {
        console.error("Error fetching data:", error);
    }
    }
  }
}
async function changePass(infoAccount,type){
  const oldElement = document.querySelector('.input-change-pass');
  const newElement = document.querySelector('.input-pass-new');
  const renewElement = document.querySelector('.input-change-repass');
  if(oldElement.value.length==0||newElement.value.length==0||renewElement.value.length==0)
  {
     alert("Vui lòng không để trống")
  }else
  {
    if (type==0) {
      oldElement.value= ""
      newElement.value=""
      renewElement.value=""
    }
    else{
      if (newElement.value!==renewElement.value) {
        
      }else{
        try {
          const response = await fetch("http://localhost:5000/api/v1/account/changePassword", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userName: infoAccount["userName"],
              password: oldElement.value,
              newPassword:newElement.value
            })
        });
        const jsonData = await response.json();
        if(jsonData)
        {
          alert("Cập nhật thành công")
        }
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        } catch (error) {
          console.error("Error fetching data:", error);
      }
      }
    }
  }
}
export default SettingComponent;
