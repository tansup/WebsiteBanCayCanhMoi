const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductTypes = new Schema({
    maLoai: {type : String, maxLength: 10},
    tenLoai: {type : String},
    maDanhMuc: {type : String, maxLength: 10},
},{collection: "ProductTypes"}); 
module.exports = mongoose.model("ProductTypes", ProductTypes);