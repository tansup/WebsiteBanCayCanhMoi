const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Categories = new Schema({
    maDanhMuc: {type : String, maxLength: 10},
    tenDanhMuc: {type : String},
},{collection: "Categories"}); 

module.exports = mongoose.model("Categories", Categories);