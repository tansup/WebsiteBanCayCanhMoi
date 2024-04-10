const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Payment = new Schema({
    paymentId: {type : String},
    orderId: {type : String},
    paymentMethod: {type : String},
    status: {type: Boolean},

},{collection: "Payments"}); 

module.exports = mongoose.model("Payments", Payment);