import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./CartPage.css";
const CartPage = ({setFlag}) => {
    const [listDetail,setListDetail] =useState(JSON.parse(localStorage.getItem('cart'))== undefined ? [] :JSON.parse(localStorage.getItem('cart')))
    const [listTotal,setListTotal] =useState([])
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
  return (
    <div className="container cart-body">
        <div className='cart-title'>Giỏ Hàng</div>
        {renderCart(listDetail,listTotal,setListDetail,setFlag)}
        {listDetail!=0&&renderTotal(listDetail,listTotal)}
        {listDetail!=0&&renderbutton(listDetail)}
    </div>
  )
}
function renderCart(listDetail,listTotal,setListDetail,setFlag) {
    if(listDetail.length==0)
    {
        return(
            <div className='cart-content'>
                Hiện không có sản phẩm nào trong giỏ hàng của bạn.<br/>
                Bạn vui lòng <Link to={"/trang-chu"} className='cart-link'>chọn sản phẩm</Link>
            </div>
        )
    }else{
        let list = filterList(listTotal,listDetail)
        return(
            <div className='cart-list'>
                <div className='list-content'>
                    - Nhấn nút "Thêm sản phẩm" để chọn thêm sản phẩm khác muốn mua thêm.<br/>
                    - Sau khi đã chọn xong các sản phẩm cần mua. Nhấn nút "Thanh toán" để mua hàng.
                </div>
                <div className='list-body'>
                <table class="table">
                    <thead className='table-header'>
                        <tr >
                        <th className='text-center'>STT</th>
                        <th className='text-center'>Hình ảnh</th>
                        <th className='text-center row-name'>Tên sản phẩm</th>
                        <th className='text-center'>Đơn giá</th>
                        <th className='text-center'>Số lượng</th>
                        <th className='text-center'>Thành tiền</th>
                        <th className='text-center'>Thao tác</th>
                        </tr>
                    </thead>
                    {
                        list && list.length > 0 ? (
                        list.map((item, index) => (
                        <tr className='table-row' key={index}>
                            <td className='text-center'>{index + 1}</td>
                            <td className='text-center'><div className="cart-row-img " style={{backgroundImage:'url("'+item["hinhAnh"]+'")'}}></div></td>
                            <td className='text-center'>{item["tenSP"]}</td>
                            <td className='text-center'>{formatPrice(item["gia"])}</td>
                            <td className='text-center'>{item["soluong"]}</td>
                            <td className='text-center'>{formatPrice(item["gia"] * item["soluong"])}</td>
                            <td className='text-center'><button className='item-btn-delete' onClick={() =>{deleteItem(item["maSP"],listDetail,setListDetail,setFlag)}}>Xóa</button></td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                        <td colSpan="7" className='text-center'>Không có dữ liệu</td>
                        </tr>
                    )
                    }
                </table>
                </div>
            </div>
        )
    }

}
function renderTotal(listDetail,listTotal) {

    let list= filterList(listTotal,listDetail)
    let price=0;
    for (let index = 0; index < list.length; index++) {
        price+=(list[index]["gia"]*list[index]["soluong"])
        
    }
        return(
        <div className='cart-total d-flex justify-content-end align-items-end '>
            <div className='total-price'>Tổng tiền: {formatPrice(price)}</div>
        </div>
       )
}
function renderbutton(listDetail) {
    if (listDetail.length!=0) {
        return(
        <div className='cart-button'>
            <button className='cart-btn-success' ><Link to={"/thanh-toan"} className='cart-link-success' >Thanh toán</Link></button>
            <button className='cart-btn-add'>Thêm sản phẩm</button>
        </div>
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
function filterList(total,detail) {
            let list = [];
            for (let index = 0; index < detail.length; index++) {
                for (let i = 0; i < total.length; i++) {
                    if (detail[index]["masp"]==total[i]["maSP"]) {
                        list.push({
                            maSP:total[i]["maSP"],
                            tenSP:total[i]["tenSP"],
                            hinhAnh:total[i]["hinhAnh"],
                            gia:total[i]["gia"],
                            soluong:detail[index]["soluong"]
                        })
                        
                    }
                }
            }
            return list;
}
function deleteItem(ma,listDetail,setListDetaill,setFlag) {
    let list =listDetail.filter(item => item.masp !== ma);
    localStorage.setItem('cart', JSON.stringify(list));
    setListDetaill(list);
    setFlag(true);
}
export default CartPage