const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Customers = new Schema({
    Name: {type : String},
    address: {type : String},
    phone: {type : String},
    age: {type : Number},
},{collection: "Customers"}); 

module.exports = mongoose.model("Customers", Customers);