const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Products = new Schema({
    maSP: {type : String, maxLength: 10},
    tenSP: {type : String},
    kichThuoc: {type : String},
    mauSac: {type : String},
    chatLieu: {type : String},
    kieuDang: {type : String},
    moTa: {type : String},
    gia: {type : Number},
    hinhAnh: {type : String},
    soluong: {type : Number},
    xuatSu: {type : String},
    maLoai: {type : String, maxLength: 10},
},{collection: "Products"}); 

module.exports = mongoose.model("Products", Products);