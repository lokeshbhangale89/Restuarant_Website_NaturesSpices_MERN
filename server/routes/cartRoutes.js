const express = require("express");

const router = express.Router();
const cartController = require("../controllers/cartController");
const  verifyToken  = require("../middlewares/authMiddleware");

router.get("/getcartitems", verifyToken, cartController.getCartController);
router.post("/addtocart", verifyToken, cartController.addToCartController);
router.delete("/removeallfromcart", verifyToken, cartController.deleteAllFromcart);
router.delete("/removeproductfromcart", verifyToken, cartController.deleteCartItem);

module.exports = router;
