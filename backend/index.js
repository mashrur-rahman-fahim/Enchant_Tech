// file: D:/web_app/Enchant_Tech/backend/index.js

import express from 'express';
import cors from 'cors';
import { log } from './middlewares/logger.js';
import mongoose from 'mongoose';
import 'dotenv/config';

import User from './models/model.js';
import Product from './models/cart.js';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import All_Product from './models/All_product.js';
import Review from './models/review.js';

const SECRET_KEY_REFRESH = process.env.SECRET_KEY_REFRESH;
const SECRET_KEY_ACCESS = process.env.SECRET_KEY_ACCESS;
const PORT = process.env.PORT || 4000;
const app = express();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));
app.use(cookieParser());
app.use(log);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is working' });
});

app.get('/api/cart', async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

app.post('/api/cart', async (req, res) => {
  const { id, img, title, description, price, cat, brand, date } = req.body;
  let count = 1;
  const newProduct = { id, count, img, title, description, price, cat, brand, date };

  try {
    const exist = await Product.findOne({ id });

    if (exist) {
      exist.count += 1;
      await exist.save();
      return res.status(201).send(exist);
    } else {
      const another = await Product.create(newProduct);
      return res.status(201).send(another);
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

app.delete('/api/cart/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const exist = await Product.findOne({ id });

    if (!exist) {
      return res.status(404).send("Product not found");
    }

    if (exist.count > 1) {
      exist.count -= 1;
      await exist.save();
      return res.status(200).send(exist);
    } else {
      await Product.deleteOne({ id });
      return res.status(200).send("Product deleted");
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.exists({ email });

  if (userExists) {
    const user = await User.findOne({ email });
    if (user.password === password) {
      const accessToken = jwt.sign({ email }, SECRET_KEY_ACCESS, { expiresIn: '1m' });
      const refreshToken = jwt.sign({ email }, SECRET_KEY_REFRESH, { expiresIn: '5m' });

      res.cookie('access_token', accessToken, { maxAge: 60000, httpOnly: true, secure: true, sameSite: 'Strict' });
      res.cookie('refresh_token', refreshToken, { maxAge: 300000, httpOnly: true, secure: true, sameSite: 'Strict' });

      return res.status(200).json({ Login: true });
    } else {
      return res.status(401).json({ Login: false, message: 'Invalid credentials' });
    }
  } else {
    return res.status(404).json({ Login: false, message: 'User not found' });
  }
});

app.get('/signUp', async (req, res) => {
  const allUsers = await User.find({});
  return res.status(200).send(allUsers);
});

app.post('/signUp', async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.exists({ email });

  if (userExists) {
    return res.status(202).json({ message: 'User exists' });
  } else {
    const newUser = await User.create({ name, email, password });
    return res.status(201).json(newUser);
  }
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return renewToken(req, res, next);
  } else {
    jwt.verify(token, SECRET_KEY_ACCESS, (err, decoded) => {
      if (err) {
        return renewToken(req, res, next);
      } else {
        req.email = decoded.email;
        return next();
      }
    });
  }
};

const renewToken = (req, res, next) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) {
    return res.status(401).json({ valid: false, message: 'No refresh token' });
  }

  jwt.verify(refreshToken, SECRET_KEY_REFRESH, (err, decoded) => {
    if (err) {
      return res.status(401).json({ valid: false, message: 'Invalid refresh token' });
    }

    const accessToken = jwt.sign({ email: decoded.email }, SECRET_KEY_ACCESS, { expiresIn: '1m' });
    res.cookie('access_token', accessToken, { maxAge: 60000, httpOnly: true, secure: true, sameSite: 'Strict' });
    req.email = decoded.email;
    return next();
  });
};

app.get('/auth', verifyUser, (req, res) => {
  return res.status(200).json({ valid: true, message: 'Authorized' });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.post('/logout', (req, res) => {
  res.clearCookie('access_token', { httpOnly: true, secure: true, sameSite: 'Strict' });
  res.clearCookie('refresh_token', { httpOnly: true, secure: true, sameSite: 'Strict' });
  return res.status(200).json({ message: 'Logged out successfully' });
});

// All Product Routes
app.get('/products', async (req, res) => {
  const products = await All_Product.find({});
  res.send(products);
});

app.post('/products', async (req, res) => {
  const rating = 0;
  const { img, title, description, price, cat, catagory, brand } = req.body;
  let id = 1;
  while (1) {
    const id_exist = await All_Product.findOne({ id });
    if (id_exist) {
      id++;
    } else {
      break;
    }
  }

  const products = { id, img, title, description, price, cat, catagory, brand, rating };
  const newProduct = await All_Product.create(products);
  res.status(200).json({ message: 'Product added successfully', newProduct });
});

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const exist = await All_Product.findOne({ id });
    if (!exist) {
      return res.status(404).json({ message: "Product not found" });
    }
    await All_Product.deleteOne({ id });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Review Routes
app.get('/review', async (req, res) => {
  const review = await Review.find({});
  return res.send(review);
});

app.post('/review', async (req, res) => {
  const { gigid, userId, star, desc } = req.body;
  const review = { gigid, userId, star, desc };
  const newReview = await Review.create(review);
  return res.send(newReview);
});
