const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
// const dotenv = require('dotenv') 
const app = express();

// dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

const corsOptions = {
    origin: 'http://localhost:3000', // allow requests from this origin
  };
  
app.use(cors(corsOptions));

// require('dotenv').config();

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);

module.exports = app;
