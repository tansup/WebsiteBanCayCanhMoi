const express = require("express");
const route = express.Router();
const OrderModel = require("../models/Orders");


route.put("/updateOrder/:orderId", async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const { quantity, totalCost, status } = req.body;
        const updatedFields = {};

        if (quantity) updatedFields.quantity = quantity;
        if (totalCost) updatedFields.totalCost = totalCost;
        if (status) updatedFields.status = status;
        const updatedOrder = await OrderModel.findOneAndUpdate({ orderId: orderId }, { $set: updatedFields }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng để cập nhật." });
        }

        res.status(200).json({ message: "Đơn hàng đã được cập nhật thành công.", order: updatedOrder });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Đã xảy ra lỗi khi cập nhật đơn hàng." });
    }
});

route.delete("/deleteOrder/:orderId", async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const deletedOrder = await OrderModel.findOneAndDelete({ orderId: orderId });

        if (!deletedOrder) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng để xóa." });
        }

        res.status(200).json({ message: "Đơn hàng đã được xóa thành công." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Đã xảy ra lỗi khi xóa đơn hàng." });
    }
});
route.get("/searchByUsername/:username", async (req, res) => {
    try {
        const username = req.params.username;

        const orders = await OrderModel.find({ username: username }).select('-__v');
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng nào cho người dùng này." });
        }
        return res.status(200).json({ orders: orders });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Đã xảy ra lỗi khi tìm kiếm đơn hàng theo tên người dùng." });
    }
});
route.post("/createOrder", async (req, res) => {
    try {
        const { quantity, orderId, totalCost, status, address, name, phone, note,username } = req.body;
        const newOrder = new OrderModel({
            quantity: quantity,
            orderId: orderId,
            totalCost: totalCost,
            status: status,
            address: address,
            name: name,
            phone:phone,
            note: note,
            username: username,
        });
        const savedOrder = await newOrder.save();
        const order = savedOrder.toObject();
        delete order.__v;
        return res.status(201).json({
            message: "Đơn hàng đã được tạo thành công",
            order: order
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Đã xảy ra lỗi khi tạo đơn hàng" });
    }
});

route.get("/", async (req, res) => {
    try {
        const orders = await OrderModel.find().select('-_v');
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng nào." });
        }
        return res.status(200).json({ orders: orders });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Đã xảy ra lỗi khi lấy đơn hàng." });
    }
});


module.exports = route;