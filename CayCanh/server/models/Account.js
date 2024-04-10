const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Accounts = new Schema({
    userName: {type : String},
    password: {type : String},
    phone: {type: String},
    role: {type : Boolean},
    email: {type : String},
},{collection: "Accounts"}); 

module.exports = mongoose.model("Accounts", Accounts);