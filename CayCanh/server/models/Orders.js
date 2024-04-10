const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Order = new Schema({
    quantity: { type: Number },
    orderId: { type: String },
    totalCost: { type: Number },
    status: { type: Boolean },
    address: {type: String},
    name: {type: String},
    phone: {type: String},
    note: { type: String },
    username: {type : String},

}, { collection: "Orders" });



module.exports = mongoose.model("Orders", Order);