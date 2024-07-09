import express from 'express';

import cors from "cors"
import { log } from './middlewares/logger.js';
import mongoose from 'mongoose';
import 'dotenv/config';
import User from './models/model.js';
import Product from './models/cart.js';

import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';




const secret_key_refresh1=process.env.secret_key_refresh;
const secret_key_access1 = process.env.secret_key_access;
const port = process.env.port;
const app = express();
mongoose.connect(process.env.mongo_url).then(console.log("Connected to MongoDB")).catch(err => console.log(err));

app.use(express.json());
app.use(cors(
{
    origin: ["http://localhost:3000"],
    credentials: true
}
   
));
app.use(cookieParser());
app.use(log);
app.get('/', (req, res) => {
    res.status(200).json({ message: "API is working" });
});

app.get('/api/cart', async (req, res) => {
    const products = await Product.find({});
    return res.status(201).send(products)

});

app.post('/api/cart', async (req, res) => {
    const { id, img, title, description, price, cat, brand, date } = req.body;
    let count = 1
    const newProduct = { id, count, img, title, description, price, cat, brand, date };
    const exist = await Product.exists({ id })
    if (exist) {
        const an = await Product.findOne({ id })
        an.count = an.count + 1
        await an.save()
        return res.status(201).send(an);
    }

    const another = await Product.create(newProduct)

    return res.status(201).send(another)
});
app.delete('/api/cart/:id', async (req, res) => {
    const { id } = req.params;
    const exist = await Product.exists({ id })
    if (!exist) {
        return res.status(404).send("not found")
    }

    const an = await Product.findOne({ id })
    if (an.count > 1) {
        an.count = an.count - 1
        await an.save()
        return res.status(201).send("sdf");
    }

    const del = await Product.deleteOne({ id })
    return res.status(201).send(del)

})


// --------------login-------------

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userExists = await User.exists({ email });
  
    if (userExists) {
      const user = await User.findOne({ email });
      if (user.password === password) {
        const access_token = jwt.sign({ email }, secret_key_access1, { expiresIn: '1m' });
        const refresh_token = jwt.sign({ email }, secret_key_refresh1, { expiresIn: '5m' });
  
        res.cookie('access_token', access_token, { maxAge: 60000, httpOnly: true, secure: true, sameSite: 'Strict' });
        res.cookie('refresh_token', refresh_token, { maxAge: 300000, httpOnly: true, secure: true, sameSite: 'Strict' });
  
        return res.json({Login:true});
      } else {
        return res.status(401).json({Login:false, message: "Invalid credentials" });
      }
    } else {
      return res.status(404).json({ Login:false,message: "User not found" });
    }
  });
app.get('/signUp', async (req, res) => {

    const allUse = await User.find({})
    console.log(allUse)
    return res.status(201).send(allUse)
})
app.post('/signUp', async (req, res) => {
    const { name, email, password } = req.body;
    const anoUser = await User.exists({ email });
    if (anoUser) {
        return res.status(202).json({ message: "user exist" })
    }
    else {
        const newUser = await User.create({ name, email, password })
        return res.status(201).json(newUser)
    }

})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
