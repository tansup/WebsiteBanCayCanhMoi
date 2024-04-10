const nodemailer = require('nodemailer');

function sendMail(email, newPassword) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, 
            auth: {
                user: "mainhathao10k2@gmail.com",
                pass: "lednafdcxbztiptq",
            },
        });
        
        const msg = {
            from: '"Cây cảnh" <email>', 
            to: email, 
            subject: "Mã xác nhận đăng nhập", 
            text: "Mã xác nhận của bạn là: "  + newPassword, 
            html: `<b>${newPassword}</b>`, 
        };

        transporter.sendMail(msg, (error, info) => {
            if (error) {
                reject(error); 
            } else {
                resolve(info); 
            }
        });
    });
}

module.exports = sendMail;
