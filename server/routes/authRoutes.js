const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
// const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/register", authController.registerController);
router.post("/login", authController.loginController);

module.exports = router;
