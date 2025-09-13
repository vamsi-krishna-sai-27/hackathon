const express=require('express')
const app=express();
app.use(express.json())
require('dotenv').config();

const {ConnectDB}=require("./utils/ConnectDB")
const {AdminRoutes}=require("./routes/adminRoutes");
const {UserRouter}=require("./routes/userRouter");
const {AuthRouter}=require('./routes/authRoutes')
const {CartRouter}=require('./routes/cartRoutes')
const {OrderRouter}=require('./routes/orderRoutes')
const {ProductRoutes}=require('./routes/productRoutes');

const { ConnectDB } = require("./utils/ConnectDB")


ConnectDB();

app.use('/api/admin',AdminRoutes);
app.use('/api/user',UserRouter);
app.use('/api/auth',AuthRouter);
app.use('/api/cart',CartRouter)
app.use('/api/order',OrderRouter);
app.use('/api/product',ProductRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`app is running at ${process.env.DEV_URL}:${process.env.PORT}`)
    console.log("working on ")
});//hello there