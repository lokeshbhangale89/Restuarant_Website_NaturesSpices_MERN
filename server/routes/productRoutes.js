const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/getallproducts', productController.getAllProducts);

module.exports = router;
