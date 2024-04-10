const plantRouter = require("./plant");
const potRouter = require("./pot");
const categoryRouter = require("./category");
const producttypeRouter = require("./producttype");
const accountRouter = require("./account");
const paymentRouter = require("./payment");
const orderRouter = require("./order");

function route(app) {
    app.use("/api/v1/plant",plantRouter);
    app.use("/api/v1/pot",potRouter);
    app.use("/api/v1/category",categoryRouter);
    app.use("/api/v1/producttype",producttypeRouter);
    app.use("/api/v1/account",accountRouter);
    app.use("/api/v1/payment",paymentRouter);
    app.use("/api/v1/order",orderRouter);
}
module.exports = route;