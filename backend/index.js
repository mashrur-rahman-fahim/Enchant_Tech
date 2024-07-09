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
  const products = await Product.find({});
  return res.status(200).send(products);
});

app.post('/api/cart', async (req, res) => {
  const { id, img, title, description, price, cat, brand, date } = req.body;
  let count = 1;
  const newProduct = { id, count, img, title, description, price, cat, brand, date };
  const exist = await Product.exists({ id });

  if (exist) {
    const an = await Product.findOne({ id });
    an.count += 1;
    await an.save();
    return res.status(200).send(an);
  }

  const another = await Product.create(newProduct);
  return res.status(201).send(another);
});

app.delete('/api/cart/:id', async (req, res) => {
  const { id } = req.params;
  const exist = await Product.exists({ id });

  if (!exist) {
    return res.status(404).send('not found');
  }

  const an = await Product.findOne({ id });

  if (an.count > 1) {
    an.count -= 1;
    await an.save();
    return res.status(200).send(an);
  }

  await Product.deleteOne({ id });
  return res.status(200).send({ message: 'Product deleted' });
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
    if (renewToken(req, res)) {
      return next();
    }
  } else {
    jwt.verify(token, SECRET_KEY_ACCESS, (err, decoded) => {
      if (err) {
        return res.status(401).json({ valid: false, message: 'Invalid token' });
      } else {
        req.email = decoded.email;
        return next();
      }
    });
  }
};

const renewToken = (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) {
    res.status(401).json({ valid: false, message: 'No refresh token' });
    return false;
  } else {
    jwt.verify(refreshToken, SECRET_KEY_REFRESH, (err, decoded) => {
      if (err) {
        res.status(401).json({ valid: false, message: 'Invalid refresh token' });
        return false;
      } else {
        const accessToken = jwt.sign({ email: decoded.email }, SECRET_KEY_ACCESS, { expiresIn: '1m' });
        res.cookie('access_token', accessToken, { maxAge: 60000, httpOnly: true, secure: true, sameSite: 'Strict' });
        return true;
      }
    });
  }
};

app.get('/auth', verifyUser, (req, res) => {
  return res.status(200).json({ valid: true, message: 'Authorized' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
