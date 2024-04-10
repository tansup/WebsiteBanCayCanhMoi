const express = require("express");
const route = express.Router();
const AccountModel = require("../models/Account");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendMail = require('../utils/mailer');

route.put("/user/updateProfile/:userName", async (req, res) => {
    try {
        const userName = req.params.userName;
        const { phone, email } = req.body;
        const user = await AccountModel.findOne({ userName: userName });
        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng." });
        }
        if (phone) {
            user.phone = phone;
        }
        if (email) {
            user.email = email;
        }
        await user.save();
        res.status(200).json({ message: "Thông tin người dùng đã được cập nhật thành công." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Đã xảy ra lỗi khi cập nhật thông tin người dùng." });
    }
});


route.post("/user/login", (req, res) => {
    const userName = req.body.userName;
    const passWord = req.body.passWord;
    AccountModel.findOne({
        userName: userName,
        password: passWord
    })
        .then(data => {
            if (data) {
                var token = jwt.sign({
                    id: data._id,
                    role: data.role,
                    active: true,
                }, 'secret', {
                    expiresIn: "2h"
                });
                return res.json({
                    message: "Đăng nhập thành công",
                    role: data.role,
                    token: token
                });
            } else
                return res.json("Đăng nhập thất bại");
        })
        .catch(err => {
            res.json("error");
        });
});
route.post("/user/register", (req, res) => {
    const userName = req.body.userName;
    const passWord = req.body.passWord;
    const email = req.body.email;
    const phone = req.body.phone;

    AccountModel.findOne({
        userName: userName
    })
        .then(existingAccount => {
            if (existingAccount) {
                return res.status(400).json({
                    message: "Tài khoản đã tồn tại"
                });
            } else {
                AccountModel.create({
                    userName: userName,
                    password: passWord,
                    email: email,
                    phone: phone,
                    role: false,
                })
                    .then(savedAccount => {
                        res.json({
                            message: "Tài khoản đã được tạo thành công",
                            account: savedAccount
                        });
                    })
                    .catch(error => {
                        res.status(500).json({
                            message: "Đã xảy ra lỗi khi lưu tài khoản mới",
                            error: error
                        });
                    });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Đã xảy ra lỗi khi kiểm tra tài khoản tồn tại",
                error: error
            });
        });
});
route.post("/changePassword", async (req, res) => {
    const { userName, password, newPassword } = req.body;
    try {
        const user = await AccountModel.findOne({ userName: userName });
        if (!user) {
            return res.status(404).json({ message: "Tài khoản không tồn tại" });
        }
        if (password !== user.password) {
            return res.status(400).json({ message: "Mật khẩu hiện tại không chính xác" });
        }
        user.password = newPassword;
        await user.save();
        return res.json({ message: "Mật khẩu đã được thay đổi thành công" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Đã xảy ra lỗi khi thay đổi mật khẩu" });
    }
});
route.post("/resetPassword", async (req, res) => {
    const { email } = req.body;

    try {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 8; i++) {
            code += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        
        const updatedUser = await AccountModel.findOne(
            { email: email },
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "Email không tồn tại" });
        }
        const emailSent = await sendMail(updatedUser.email, code);
        if (emailSent) {
            return res.json({ message:  code});
        } else {
            return res.status(500).json({ message: "Gửi email thất bại" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Đã xảy ra lỗi khi thực hiện quá trình lấy lại mật khẩu" });
    }
});
route.get("/user/:userName", async (req, res) => {
    try {
        const userName = req.params.userName;

        const user = await AccountModel.findOne({ userName: userName })

        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng." });
        }

        res.status(200).json({ message: "Thông tin người dùng", user: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Đã xảy ra lỗi khi lấy thông tin người dùng." });
    }
});

route.get("/", async (req, res) => {
    try {
        const users = await AccountModel.find({})

        if (!users) {
            return res.status(404).json({ message: "Không tìm thấy người dùng." });
        }
        res.status(200).json({ message: "Thông tin người dùng", users: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Đã xảy ra lỗi khi lấy thông tin người dùng." });
    }
});
route.get("/user/searchByEmail/:email", async (req, res) => {
    try {
        const email = req.params.email;

        const user = await AccountModel.findOne({ email: email })

        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng." });
        }

        res.status(200).json({ message: "Thông tin người dùng", user: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Đã xảy ra lỗi khi tìm kiếm thông tin người dùng." });
    }
});
module.exports = route;
