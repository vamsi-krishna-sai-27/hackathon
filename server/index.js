const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();

const { ConnectDB } = require("./utils/ConnectDB");

// Import routers directly (NO destructuring)
const AdminRoutes = require("./routes/adminRoutes");
const UserRoutes = require("./routes/userRoutes");
const AuthRoutes = require("./routes/authRoutes");
const CartRoutes = require("./routes/cartRoutes");
const OrderRoutes = require("./routes/orderRoutes");
const ProductRoutes = require("./routes/productRoutes");

ConnectDB();

app.use("/api/admin", AdminRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/auth", AuthRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/order", OrderRoutes);
app.use("/api/product", ProductRoutes);

app.listen(process.env.PORT, () => {
  console.log(
    `app is running at ${process.env.DEV_URL}:${process.env.PORT}`
  );
  console.log("working on ");
});
