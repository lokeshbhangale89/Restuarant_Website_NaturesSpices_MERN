const User = require("../models/user");
const jwt = require("jsonwebtoken");

const { CustomErrorHandler, handleError } = require("../services/CustomErrorHandler");
const bcrypt = require('bcryptjs');


const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    return next(new CustomErrorHandler("Invalid credentials", 401));
  }

  const match = await bcrypt.compareSync(password, user.password);
  if (!match) {
    return next(new CustomErrorHandler("Invalid credentials", 401));

  }

  const accessToken = jwt.sign(
    { _id: user._id, role: user.role, name: user.name },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  // res.cookies()
  // res.cookie('rememberme', 'yes', { maxAge: 900000, httpOnly: true});
  res.cookie("mycookie", "1234567890", { secure:'none', maxAge:120000, httpOnly: true });
  // res.setHeader('Set-Cookie', 'isLoggedin=true');

  res.json({
    accessToken: accessToken,
    name: user.name
  });
};



const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  if(!name || !email || !password){
    return next(new CustomErrorHandler("Please fill all required fields", 401));
  }

  const exist = await User.exists({ email: email });
  if (exist) {
    return next(new CustomErrorHandler("Email already taken", 422));
  }

  const hashedPassword = await bcrypt.hashSync(password, 10);

  const user = new User({
    name: name,
    email: email,
    password: hashedPassword,
  });

  try {
    const result = await user.save();
    res.status(201).json({
      message: "User created successfully",
      result: result,
    });
  } catch (error) {
    return next(error);
  }
};


module.exports = {
  loginController,
  registerController,
};

