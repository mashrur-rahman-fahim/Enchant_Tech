import express from 'express';
import fs from 'fs';
import cors from "cors"
import { log } from './middlewares/logger.js';
import mongoose from 'mongoose';
import 'dotenv/config';
import User from './models/model.js';
import Product from './models/cart.js';





const port = process.env.port;
const app = express();
mongoose.connect(process.env.mongo_url).then(console.log("Connected to MongoDB")).catch(err => console.log(err));

app.use(express.json());
app.use(cors());
app.use(log);
app.get('/', (req, res) => {
    res.status(200).json({ message: "API is working" });
});

app.get('/api/cart', async(req, res) => {
    const products= await Product.find({});
    return res.status(201).send(products)

});

app.post('/api/cart',async (req, res) => {
    const { id, img, title, description, price, cat, brand, date } = req.body;
    let count=1
    const newProduct = { id,count, img, title, description, price, cat, brand, date };
    const exist=await Product.exists({id})
    if(exist){
            const an=await Product.findOne({id})
            an.count=an.count+1
            await an.save()
            return res.status(201).send(an);
    }
    
    const another= await Product.create(newProduct)

    return res.status(201).send(another)
});
app.delete('/api/cart/:id',async (req, res) => {
    const { id } = req.params;
    const exist=await Product.exists({id})
    if(!exist){
        return res.status(404).send("not found")}

        const an=await Product.findOne({id})
        if(an.count>1){
        an.count=an.count-1
            await an.save()
            return res.status(201).send("sdf");
    }

    const del=await Product.deleteOne({id})
    return res.status(201).send(del)

})


// --------------login-------------
app.get('/login', async (req, res) => {
   
    const allUse=await User.find({})
       console.log(allUse)
    return res.status(201).send(allUse)
})
app.post('/login', async (req, res) => {
    const { name, email, password } = req.body;
    const anoUser=await User.exists({email});
    if(anoUser){
       return res.status(202).json({message:"user exist"})}
    else{
        const newUser=await User.create({name,email,password})
return res.status(201).json(newUser)}
    
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
