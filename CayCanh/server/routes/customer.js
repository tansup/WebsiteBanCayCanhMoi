const express = require("express");
const route = express.Router();
const CustomerModel = require("../models/Customer")

//  get id /search
route.post("",(req,res) =>{
    // const pass = req.body.passWord;
    CustomerModel.find({customerId:req.body.id}).select('-_id')
    .then( data =>{
        res.json(data)
    })
    .catch(err =>{
        res.json("error");
    })

})

module.exports = route;