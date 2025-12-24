const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const verifyToken  = require("../middlewares/authMiddleware");

router.post("/createorders", verifyToken, orderController.createOrder);
router.get("/getordersbyuser", verifyToken, orderController.getOrdersByUser);


module.exports = router;
