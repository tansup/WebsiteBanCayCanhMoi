const express = require("express");
const route = express.Router();
const PaymentModel = require("../models/Payments");

let $ = require('jquery');
const moment = require('moment');
route.post("/createPayment", async (req, res) => {
    try {
        const { paymentId, orderId,paymentMethod, status } = req.body;
        const newPayment = new PaymentModel({
            paymentId: paymentId,
            orderId: orderId,
            paymentMethod: paymentMethod,
            status: status
        });
        const savedPayment = await newPayment.save();
        const payment = savedPayment.toObject();
        delete payment.__v;
        return res.status(200).json({
            message: "Payment đã được tạo thành công",
            payment: payment
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Đã xảy ra lỗi khi tạo bản ghi Payment" });
    }
});



route.post('/create_payment_url', function (req, res, next) {
    
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    
    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');
    
    let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    
    let tmnCode = "1F4TVRMV";
    let secretKey = "EJVIZFLAYOCLPMUPXHSQCLRTZCAWTPOO";
    let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    let returnUrl = "http://localhost:3000/xac-minh-thanh-toan";
    let orderId = req.body.orderId;
    let amount = req.body.amount;
    let bankCode = req.body.bankCode;
    
    let locale = "VN";
    if(locale === null || locale === ''){
        locale = 'vn';
    }
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if(bankCode !== null && bankCode !== ''){
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");     
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    res.redirect(vnpUrl)
});


function sortObject(obj) {
	let sorted = {};
	let str = [];
	let key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

module.exports = route;