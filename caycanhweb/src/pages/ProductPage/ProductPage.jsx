import React, { useState,useEffect,useRef } from "react";
import { Link } from 'react-router-dom';
import "./ProductPage.css";
import { useParams } from 'react-router-dom';
const ProductPage = () => {
    const { tensp, masp, maloai } = useParams();
    const [types, setTypes] = useState([]);
    const [product, setproduct] = useState([]);
    let flag= false;
    useEffect(()=>{
        const fetchTypePlants = async () => {
            try {
              const response = await fetch("http://localhost:5000/api/v1/producttype/plant");
              const jsonData = await response.json();
              setTypes(jsonData["producttypes"]);
            } catch (error) {
              console.error("Error fetching data:", error);
            }
            };
            const fetchProducts = async () => {
                let flag= false;
                for (let index = 0; index < types.length; index++) {
                    if (types[index]["maLoai"].localeCompare(maloai) === 0) {
                      flag=true;
                    }
                }
                if (flag==true) {
                    try {
                        const response = await fetch("http://localhost:5000/api/v1/plant/search/AN31583688");
                        const jsonData = await response.json();
                        setproduct(jsonData["plant"]);
                      } catch (error) {
                        console.error("Error fetching data:", error);
                      }
                }else{
                    try {
                        const response = await fetch("http://localhost:5000/api/v1/pot/search/"+masp);
                        const jsonData = await response.json();
                        setproduct(jsonData["pot"]);
                      } catch (error) {
                        console.error("Error fetching data:", error);
                      }
                }

                };
        fetchTypePlants()
        fetchProducts()
        
    },[masp])
    console.log();
  return (
    <div className="container product-body">
        {renderProduct(product,maloai)}
    </div>
  )
  function renderProduct (pd,maloai) {

    for (let index = 0; index < types.length; index++) {
        if (types[index]["maLoai"].localeCompare(maloai) === 0) {
        flag=true;
        }
    }
    if (flag==true) {
        if (pd && pd.length > 0) {
            return(
                <div className="product-detail d-flex">
                    <div className="detail-img col-5" 
                    style={{backgroundImage:'url("'+pd[0]["hinhAnh"]+'")'}}
                    >
                    </div>
                    <div className="detail-info col-5">
                        <div className="info-title">{product[0]["tenSP"]}</div>
                        <div className="info-size"><strong>Kích thước:</strong> {product[0]["kichThuoc"]}</div>
                        <div className="info-description"><strong>Mô tả:</strong> {product[0]["moTa"]}</div>
                        <div className="info-price">Giá bán: {formatPrice(product[0]["gia"])}</div>
                        <div className="info-source"><strong>Xuất xứ:</strong>{product[0]["xuatSu"]}</div>
                        <div className="info-count"><strong>Số lượng: </strong>{product[0]["soLuong"]}</div>
                        <div className='detail-button'>
                            <button className='detail-btn-add'>Thêm vào giỏ hàng</button>
                        </div>
                    </div>

                </div>
            );
        } else {
            return null;
        }
    }else
    {
        if (pd && pd.length > 0) {
            return(
                <div className="product-detail d-flex">
                    <div className="detail-img col-5" 
                    style={{backgroundImage:'url("'+pd[0]["hinhAnh"]+'")'}}
                    >
                    </div>
                    <div className="detail-info col-5">
                        <div className="info-title">{product[0]["tenSP"]}</div>
                        <div className="info-size"><strong>Kích thước:</strong> {product[0]["kichThuoc"]}</div>
                        <div className="info-color"><strong>Màu sắc:</strong> {product[0]["mauSac"]}</div>
                        <div className="info-material"><strong>Chất liệu:</strong> {product[0]["chatLieu"]}</div>
                        <div className="info-style"><strong>Kiểu dáng:</strong> {product[0]["KieuDang"]}</div>
                        <div className="info-price">Giá bán: {formatPrice(product[0]["gia"])}</div>
                        <div className="info-count"><strong>Số lượng: </strong>{product[0]["soLuong"]}</div>
                        <div className='detail-button'>
                            <button className='detail-btn-add'>Thêm vào giỏ hàng</button>
                        </div>
                    </div>

                </div>
            );
        } else {
            return null;
        }
    }
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
export default ProductPage