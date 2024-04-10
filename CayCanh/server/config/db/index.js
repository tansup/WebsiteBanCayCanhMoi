const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://127.0.0.1:27017/Website")
        console.log(`successfully: ${conn.connection.host}`);
     } catch (error) {
        console.log("fail");
        process.exit(1);
     }
}

module.exports = connectDB ;