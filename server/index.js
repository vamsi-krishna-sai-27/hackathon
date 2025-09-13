const express=require('express')
const app=express();
app.use(express.json())
require('dotenv').config();
const {ConnectDB}=require("./utils/ConnectDB")

ConnectDB();
app.listen(process.env.PORT,()=>{
    console.log(`app is running at ${process.env.DEV_URL}:${process.env.PORT}`)
});