import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./ConfirmPayMentPage.css";
const ConfirmPayMentPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const vnp_TransactionNo = searchParams.get('vnp_TransactionNo');

  console.log(localStorage.getItem('flagCreate'));
  useEffect(  ()  => {
    const methodOnline = async () =>{
        let paymentMethod ="Thanh toán qua VNPAY";
        try {
            const response = await fetch("http://localhost:5000/api/v1/payment/createPayment", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    paymentId: vnp_TransactionNo,
                    orderId: localStorage.getItem('orderId'),
                    paymentMethod: paymentMethod,
                    status: true
                })
            });
        
            localStorage.removeItem('orderId')
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    const methodOffline = async () =>{
        let paymentMethod ="Thanh toán khi nhận hàng";
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let captcha = '';
        for (let i = 0; i < 10; i++) {
            captcha += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        try {
            const response = await fetch("http://localhost:5000/api/v1/payment/createPayment", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    paymentId: captcha,
                    orderId: localStorage.getItem('orderId'),
                    paymentMethod: paymentMethod,
                    status: false
                })
            });
        
            localStorage.removeItem('orderId')
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    if(localStorage.getItem('flagCreate')!= undefined)
    {
        if(vnp_TransactionNo!= undefined)
        {
            methodOnline();
        }else
        {
            methodOffline();
           
        }
        localStorage.removeItem('flagCreate');
    }

  }, []);
  return (
    <div className="container confirm-body">
        <div className='confirm-title text-center'>
            Đơn đặt hàng thành công
        </div>
        <div className='confirm-button'>
            <button className='confirm-btn-verify' ><Link to={'/trang-chu'} className='confirm-link-verify'>Trở về trang chủ</Link></button>
        </div>
    </div>
  )
}
export default ConfirmPayMentPage