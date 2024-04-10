const express = require("express");
const route = express.Router();
const PlantModel = require("../models/Products")

route.post("/createProducts", async (req, res) => {
    try {
        const {
            maSP,
            tenSP,
            kichThuoc,
            mauSac,
            chatLieu,
            kieuDang,
            moTa,
            gia,
            hinhAnh,
            soluong,
            xuatSu,
            maLoai
        } = req.body;

        if (!maSP || !tenSP || !gia || !soluong || !maLoai) {
            return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin sản phẩm." });
        }

        const productFields = {}; 

        if (maSP) productFields.maSP = maSP;
        if (tenSP) productFields.tenSP = tenSP;
        if (kichThuoc) productFields.kichThuoc = kichThuoc;
        if (mauSac) productFields.mauSac = mauSac;
        if (chatLieu) productFields.chatLieu = chatLieu;
        if (kieuDang) productFields.kieuDang = kieuDang;
        if (moTa) productFields.moTa = moTa;
        if (gia) productFields.gia = gia;
        if (hinhAnh) productFields.hinhAnh = hinhAnh;
        if (soluong) productFields.soluong = soluong;
        if (xuatSu) productFields.xuatSu = xuatSu;
        if (maLoai) productFields.maLoai = maLoai;

        const newProduct = new PlantModel(productFields);
        await newProduct.save();

        res.status(201).json({ message: "Sản phẩm đã được tạo thành công." });
    } catch (err) {
        console.error("Lỗi khi tạo sản phẩm:", err);
        res.status(500).json({ message: "Đã có lỗi xảy ra khi tạo sản phẩm." });
    }
});
route.put("/updateProduct/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const {
            tenSP,
            kichThuoc,
            mauSac,
            chatLieu,
            kieuDang,
            moTa,
            gia,
            hinhAnh,
            soluong,
            xuatSu,
            maLoai
        } = req.body;

        const updatedProductFields = {};

        if (tenSP) updatedProductFields.tenSP = tenSP;
        if (kichThuoc) updatedProductFields.kichThuoc = kichThuoc;
        if (mauSac) updatedProductFields.mauSac = mauSac;
        if (chatLieu) updatedProductFields.chatLieu = chatLieu;
        if (kieuDang) updatedProductFields.kieuDang = kieuDang;
        if (moTa) updatedProductFields.moTa = moTa;
        if (gia) updatedProductFields.gia = gia;
        if (hinhAnh) updatedProductFields.hinhAnh = hinhAnh;
        if (soluong) updatedProductFields.soluong = soluong;
        if (xuatSu) updatedProductFields.xuatSu = xuatSu;
        if (maLoai) updatedProductFields.maLoai = maLoai;

        const updatedProduct = await PlantModel.findOneAndUpdate({ maSP: id }, { $set: updatedProductFields }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm để cập nhật." });
        }

        res.status(200).json({ message: "Sản phẩm đã được cập nhật thành công." });
    } catch (err) {
        console.error("Lỗi khi cập nhật sản phẩm:", err);
        res.status(500).json({ message: "Đã có lỗi xảy ra khi cập nhật sản phẩm." });
    }
});
route.get("",(req,res) =>{
    PlantModel.find().select('-_id')
    .then( data =>{
        data = data.filter(item => item["maLoai"] !== "CM56931108");
        data = data.filter(item => item["maLoai"] !== "PS59670186");
        data = data.filter(item => item["maLoai"] !== "TE57322385");
        const jsonData = {
            plants:data
            };
        res.json(jsonData)    
    })
    .catch(err =>{
        res.json("error");
    })

})
route.get("/all",(req,res) =>{
    PlantModel.find().select('-_id -__v')
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
    PlantModel.find({maLoai:req.query.ml}).select('-_id')
    .then( data =>{
        const jsonData = {
            plants:data
            };
        res.json(jsonData)        
    })
    .catch(err =>{
        res.json("error");
    })
    }

})
route.delete("/deleteProduct/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedProduct = await PlantModel.findOneAndDelete({ maSP: id });

        if (!deletedProduct) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm để xóa." });
        }
        res.status(200).json({ message: "Sản phẩm đã được xóa thành công." });
    } catch (err) {
        console.error("Lỗi khi xóa sản phẩm:", err);
        res.status(500).json({ message: "Đã có lỗi xảy ra khi xóa sản phẩm." });
    }
});
route.get("/search/:id",(req,res) =>{
    const id = req.params.id;
    PlantModel.find({maSP:id}).select('-_id')
    .then( data =>{
        const jsonData = {
            plant:data
            };
        res.json(jsonData)        
    })
    .catch(err =>{
        res.json("error");
    })

})
module.exports = route;