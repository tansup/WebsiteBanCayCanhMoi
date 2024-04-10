const express = require("express");
const route = express.Router();
const ProductTypeModel = require("../models/ProductType")


route.post("/createProductType", async (req, res) => {
    try {
        const { maLoai, tenLoai, maDanhMuc } = req.body;
        if (!maLoai || !tenLoai || !maDanhMuc) {
            return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ thông tin loại sản phẩm." });
        }
        const newProductType = new ProductTypeModel({
            maLoai,
            tenLoai,
            maDanhMuc
        });
        await newProductType.save();

        res.status(201).json({ message: "Loại sản phẩm đã được tạo thành công." });
    } catch (err) {
        console.error("Lỗi khi tạo loại sản phẩm:", err);
        res.status(500).json({ message: "Đã có lỗi xảy ra khi tạo loại sản phẩm." });
    }
});

route.delete("/deleteProductType/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedProductType = await ProductTypeModel.findOneAndDelete({ maLoai: id });

        if (!deletedProductType) {
            return res.status(404).json({ message: "Không tìm thấy loại sản phẩm để xóa." });
        }

        res.status(200).json({ message: "Loại sản phẩm đã được xóa thành công." });
    } catch (err) {
        console.error("Lỗi khi xóa loại sản phẩm:", err);
        res.status(500).json({ message: "Đã có lỗi xảy ra khi xóa loại sản phẩm." });
    }
});

route.put("/updateProductType/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { tenLoai, maDanhMuc } = req.body;
        if (!tenLoai || !maDanhMuc) {
            return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ thông tin loại sản phẩm." });
        }
        const updatedProduct = {};
        if (tenLoai) updatedProduct.tenLoai = tenLoai;
        if (maDanhMuc) updatedProduct.maDanhMuc = maDanhMuc;
        const updatedProductType = await ProductTypeModel.findOneAndUpdate({ maLoai: id }, { $set: updatedProduct }, { new: true });

        if (!updatedProductType) {
            return res.status(404).json({ message: "Không tìm thấy loại sản phẩm để cập nhật." });
        }

        res.status(200).json({ message: "Loại sản phẩm đã được cập nhật thành công." });
    } catch (err) {
        console.error("Lỗi khi cập nhật loại sản phẩm:", err);
        res.status(500).json({ message: "Đã có lỗi xảy ra khi cập nhật loại sản phẩm." });
    }
});

route.get("",(req,res) =>{
    ProductTypeModel.find().select('-_id')
    .then( data =>{
        const jsonData = {
            producttypes:data
            };
        res.json(jsonData)
    })
    .catch(err =>{
        res.json("error");
    })
})

route.get("/plant",(req,res) =>{
    ProductTypeModel.find({maDanhMuc:"PL71309576"}).select('-_id')
    .then( data =>{
        const jsonData = {
            producttypes:data
            };
        res.json(jsonData)
    })
    .catch(err =>{
        res.json("error");
    })
})
route.get("/pot",(req,res) =>{
    ProductTypeModel.find({maDanhMuc:"PO67156722"}).select('-_id')
    .then( data =>{
        const jsonData = {
            producttypes:data
            };
        res.json(jsonData)
    })
    .catch(err =>{
        res.json("error");
    })
})

route.get("/",(req,res) =>{
    ProductTypeModel.find({}).select('-_id')
    .then( data =>{
        const jsonData = {
            producttypes:data
            };
        res.json(jsonData)
    })
    .catch(err =>{
        res.json("error");
    })
})
module.exports = route;