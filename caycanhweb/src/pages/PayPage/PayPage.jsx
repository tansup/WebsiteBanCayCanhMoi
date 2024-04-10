import React ,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./PayPage.css";
const PayPage = ({setFlag}) => {
    const [name,setName] =useState(localStorage.getItem("username")!=null?localStorage.getItem("username"):null)
    let list=[{}];
    const [listDetail,setListDetail] =useState(JSON.parse(localStorage.getItem('cart'))== undefined ? [] :JSON.parse(localStorage.getItem('cart')))
    const [listTotal,setListTotal] =useState([]);
    const [captcha,setCaptcha] =useState(randomCaptcha());
    const [id,setId] =useState(randomCaptcha());
    const [price,setPrice] =useState(0);
    useEffect(() => {
        const fetchTotal = async () => {
          try {
            const response = await fetch("http://localhost:5000/api/v1/plant/all");
            const jsonData = await response.json();
            setListTotal(jsonData["products"]);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        fetchTotal();
      }, [listDetail]);

      const payment = async (name,setCaptcha,id,setPrice) =>{
        const payMethodElement = document.querySelector('.form-select');
        const captchaElement= document.querySelector('.method-captcha-text');        
        const reCaptchaElement = document.querySelector('.input-captcha');
        const infoElement= document.querySelector('.input-note');        
        const nameElement = document.querySelector('.input-info-name');
        const phoneElement= document.querySelector('.input-info-phone');        
        const addressElement = document.querySelector('.input-info-address');
        let list = filterList(listTotal,listDetail)
        let price=0;
        let quantity = 0;
        for (let index = 0; index < list.length; index++) {
            price+=(list[index]["gia"]*list[index]["soluong"])
            quantity +=list[index]["soluong"];
        }
        setPrice(price);
            console.log(payMethodElement.value );
            if (captchaElement.value.toLowerCase() === reCaptchaElement.value.toLowerCase()) {
                if(infoElement.value==""||nameElement.value==""||phoneElement.value==""||addressElement.value=="")
                {
                    alert("Vui lòng điền đầy đủ thông tin")
                }
                else{
                    
                    if(payMethodElement.value=="")
                    {
                        alert("Vui lòng chọn phương thức thanh toán")
                    }else{
                        try {
                            const response = await fetch("http://localhost:5000/api/v1/order/createOrder", {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    quantity: quantity,
                                    orderId: id,
                                    totalCost: price,
                                    status: true,
                                    name: nameElement.value,
                                    address: addressElement.value,
                                    phone: phoneElement.value,
                                    note: infoElement.value,
                                    username:localStorage.getItem("username")
                                })
                            });
                        
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            localStorage.setItem('orderId',id);
                            localStorage.setItem('flagCreate',true);
                            if(payMethodElement.value ==0)
                            {
                                document.getElementById("paymentForm").submit();
                            }
                            else
                            {
                                window.location.href ="/xac-minh-thanh-toan"
                            }
        
                            
                            localStorage.removeItem('cart');
                            setFlag(true);
        
                        } catch (error) {
                            console.error("Error fetching data:", error);
                        }
                    }
                }

            }else {
                alert("Sai mã xác nhận")
            }
        
        setCaptcha(randomCaptcha())
      }
  return (
    <div className="container pay-body">
        <div className='pay-title'>Thanh toán</div>
        {renderPay(list,name,listTotal,listDetail,payment,captcha,setCaptcha,id,setPrice)}
            <form id="paymentForm" action="http://localhost:5000/api/v1/payment/create_payment_url" method="POST">
            <input type="text" name="orderId" value={id} style={{ display: 'none' }}/>
            <input type="text" name="amount" value={price} style={{ display: 'none' }}/>
            <input type="text" name="bankCode" value={"NCB"} style={{ display: 'none' }}/>
        </form>

    </div>
  )
}
function renderPay(list,name,listTotal,listDetail,payment,captcha,setCaptcha,id,setPrice) {
    if (list.length==0) {
        return(
            <div className='pay-content'>
                Hiện không có sản phẩm nào trong giỏ hàng của bạn.<br/>
                Bạn vui lòng <Link className='pay-link'>chọn sản phẩm</Link>
            </div>
        )
    }else{
        return(
        <div className='pay-content d-flex'>
        {renderMethod(name,payment,captcha,setCaptcha,id,setPrice)}
        <div className="method-info col-5 d-flex flex-wrap">
            {renderAddress()}
            {renderOrder(listTotal,listDetail)}
        </div>
        </div>
        )
    }
}
function renderMethod(name,payment,captcha,setCaptcha,id,setPrice) {
    if(name!=null)
    {
        return(
            <div className="method-pay col-7">
                <div className='method-title d-flex justify-content-center align-items-center '>Phương thức thanh toán</div>
                <table className='method-table'>
                    <tr className='method-row'>
                        <td className='table-title'>Cách Thanh Toán</td>
                        <td className='table-input'>
                            <select name="method-choice" className='method-choice form-select' >
                                <option disabled selected value="">Chọn phương thức thanh toán</option>
                                <option value="0">Thanh toán qua VNPAY</option>
                                <option value="1">Thanh toán khi nhận hàng</option>
                            </select>
                        </td>
                    </tr>                 
                     <tr className='method-row'>
                        <td className='table-title'>Mã Captcha</td>
                        <td className='table-input'><input type="text" name='captcha-text'  className='method-captcha-text form-control w-25 text-center' disabled value={captcha}/></td>
                    </tr>                    
                    <tr className='method-row'>
                        <td className='table-title'>Nhập Mã Captcha</td>
                        <td className='table-input'><input type="text"name='input-captcha' className='input-captcha form-control w-25' placeholder='Mã Captcha...'/></td>
                    </tr>                   
                     <tr className='method-row'>
                        <td className='table-title'>Thông Tin Thêm</td>
                        <td className='table-input'>
                            <textarea name="input-note"  className='input-note form-control' id="" cols="20" rows="5" ></textarea>
                        </td>
                    </tr >
                </table>
                {renderbutton(name,payment,setCaptcha,id,setPrice)}
            </div>
        )
    }
    else{
        return(
            <div className="method-pay col-7 ">
              <div className='method-title d-flex justify-content-center align-items-center '>Vui lòng đăng nhập trước khi tiến hành thanh toán</div>
            
             <div className='account-button d-flex flex-column justify-content-center align-items-center '>
                <Link to={"/dang-nhap"} className='account-btn-log text-center '>Đăng nhập</Link>
            </div>

                </div>
        )
    }
}
function renderbutton(name,payment,setCaptcha,id,setPrice) {
    if (name!=null) {
        return(
        <div className='method-button d-flex justify-content-center align-items-center '>
            <button type='submit' className='method-btn-pay' onClick={() =>payment(name,setCaptcha,id,setPrice)}>Thanh toán</button>
        </div>
       )
    } 
}
function renderAddress() {
        return(
        <div className='info-delivery '>
            <div className='address-title '>Thông tin giao hàng</div>
            <div class="input-group mb-2 info-name">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                        </svg>
                    </span>
                </div>
                <input type="text" class="form-control input-info-name" placeholder="Tên người nhận"/>
            </div>
            <div class="input-group mb-2 info-phone">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
                        <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                    </svg>
                    </span>
                </div>
                <input type="text" class="form-control input-info-phone" placeholder="Số điện thoại"/>
            </div>
            <div class="input-group mb-2 info-address">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16">
                            <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z"/>
                        </svg>
                    </span>
                </div>
                <input type="text" class="form-control input-info-address" placeholder="Địa chỉ nhận hàng"/>
            </div>
        </div>
       )

}
function renderOrder(listTotal,listDetail) {
    let list = filterList(listTotal,listDetail)
    return(
        <div className='info-order '>
            <div className='order-title '>Thông tin đơn hàng</div>
            <div className='order-list'>
            <table class="table">
                    <thead className='table-header'>
                        <tr >
                        <th className='order-text text-center'>STT</th>
                        <th className='order-text text-center order-name'>Tên sản phẩm</th>
                        <th className='order-text text-center'>Đơn giá</th>
                        <th className='order-text text-center'>Số lượng</th>
                        <th className='order-text text-center'>Thành tiền</th>
                        </tr>
                    </thead>
                    {list.map((item,index) =>(
                        <tr className='order-table-row' key={index}>
                        <td className='order-text text-center'>{index+1}</td>
                        <td className='order-text text-start'>{item["tenSP"]}</td>
                        <td className='order-text text-center'>{formatPrice(item["gia"])}</td>
                        <td className='order-text text-center'>{item["soluong"]}</td>
                        <td className='order-text text-center'>{formatPrice(item["gia"]*item["soluong"])}</td>
                        </tr>
                    ))}
                </table>
            {renderTotal(list)}
            </div>
        </div>
       )
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
function renderTotal(list) {

    let price=0;
    for (let index = 0; index < list.length; index++) {
        price+=(list[index]["gia"]*list[index]["soluong"])
        
    }
        return(
        <div className='order-total d-flex justify-content-between'>
            <div className='order-price-text'>Thành tiền</div>
            <div className='order-price-number'>{formatPrice(price)}</div>
        </div>
       )
}
function filterList(total,detail) {
    let list = [];
    for (let index = 0; index < detail.length; index++) {
        for (let i = 0; i < total.length; i++) {
            if (detail[index]["masp"]==total[i]["maSP"]) {
                list.push({
                    maSP:total[i]["maSP"],
                    tenSP:total[i]["tenSP"],
                    gia:total[i]["gia"],
                    soluong:detail[index]["soluong"]
                })
                
            }
        }
    }
    return list;
}
function randomCaptcha() {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let captcha = '';
        for (let i = 0; i < 10; i++) {
            captcha += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return captcha
}
export default PayPage