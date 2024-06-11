import express from 'express';
import Product from '../frontend/src/components/Product/ProductData.js'


const app=express();
app.get('/',(req,res)=>{
        res.status(200).json({messege:"api is working"})

})