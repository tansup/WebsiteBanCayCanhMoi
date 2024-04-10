const express = require("express");
const route = express.Router();
const CategoryModel = require("../models/Category")

route.post("/addCategory", async (req, res) => {
    try {
        const { maDanhMuc, tenDanhMuc } = req.body;
        if (!maDanhMuc || !tenDanhMuc) {
            return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ thông tin danh mục." });
        }
        const newCategory = new CategoryModel({
            maDanhMuc,
            tenDanhMuc
        });

        await newCategory.save();

        res.status(201).json({ message: "Danh mục đã được thêm thành công." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Đã xảy ra lỗi khi thêm danh mục." });
    }
});

route.delete("/deleteCategory/:maDanhMuc", async (req, res) => {
    try {
        const maDanhMuc = req.params.maDanhMuc;

        const deletedCategories = await CategoryModel.deleteMany({ maDanhMuc: maDanhMuc });

        if (deletedCategories.deletedCount === 0) {
            return res.status(404).json({ message: "Không tìm thấy danh mục để xóa." });
        }

        res.status(200).json({ message: "Tất cả danh mục đã được xóa thành công." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Đã xảy ra lỗi khi xóa danh mục." });
    }
});

route.put("/updateCategory/:maDanhMuc", async (req, res) => {
    try {
        const maDanhMuc = req.params.maDanhMuc;
        const { tenDanhMuc } = req.body;
        if (!tenDanhMuc) {
            return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ thông tin danh mục." });
        }
        const updatedCategory = await CategoryModel.findOneAndUpdate({ maDanhMuc: maDanhMuc }, { $set: { tenDanhMuc: tenDanhMuc } }, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ message: "Không tìm thấy danh mục để cập nhật." });
        }

        res.status(200).json({ message: "Danh mục đã được cập nhật thành công." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Đã xảy ra lỗi khi cập nhật danh mục." });
    }
});

route.get("",(req,res) =>{
    CategoryModel.find().select('-_id')
    .then( data =>{
        const jsonData = {
            categories:data
            };
        res.json(jsonData)
    })
    .catch(err =>{
        res.json("error");
    })
})

route.get("/search",(req,res) =>{
    if(req.query.dm)
    CategoryModel.find({maDanhMuc: req.query.dm}).select('-_id')
    .then( data =>{
        const jsonData = {
            category:data
            };
        res.json(jsonData)
    })
    .catch(err =>{
        res.json("error");
    })

})

module.exports = route;