const express = require("express");
const route = express.Router();
const PotModel = require("../models/Products")

route.get("",(req,res) =>{
    PotModel.find().select('-_id')
    .then( data =>{
        data = data.filter(item => item["maLoai"] !== "HP71746869");
        data = data.filter(item => item["maLoai"] !== "SLCA452863");
        data = data.filter(item => item["maLoai"] !== "AQ63584597");
        data = data.filter(item => item["maLoai"] !== "TA47597777");
        const jsonData = {
            pots:data
            };
        res.json(jsonData)    
    })
    .catch(err =>{
        res.json("error");
    })
})
route.get("/all",(req,res) =>{
    PotModel.find().select('-_id')
    .then( data =>{
        const jsonData = {
            products:data
            };
        res.json(jsonData)    
    })
    .catch(err =>{
        res.json("error");
    })
})

route.get("/search",(req,res) =>{
    if(req.query.ml)
    {
    PotModel.find({maLoai:req.query.ml}).select('-_id')
    .then( data =>{
        const jsonData = {
            pots:data
            };
        res.json(jsonData)        
    })
    .catch(err =>{
        res.json("error");
    })
    }

})

route.get("/search/:id",(req,res) =>{
    const id = req.params.id;
    PotModel.find({maSP:id}).select('-_id')
    .then( data =>{
        const jsonData = {
            pot:data
            };
        res.json(jsonData)        
    })
    .catch(err =>{
        res.json("error");
    })

})
module.exports = route;