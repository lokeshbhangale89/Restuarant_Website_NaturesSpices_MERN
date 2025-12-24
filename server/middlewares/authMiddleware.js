const jwt = require('jsonwebtoken');
const { CustomErrorHandler } = require("../services/CustomErrorHandler");

const jwt_decode = require('jwt-decode')

const auth = async (req, res, next) => {
  let token;
  let userID;

  if (req.body && req.body.userID) {
    token = req.body.accessToken;
    userID = req.body.userID;
  } else {
    token = req.query.accessToken;
    // console.log(req.query.accessToken)
    userID = req.query._id;
  }

  if (!token) {
    return next(new CustomErrorHandler('Unauthorized access', 401));
  }

  try {
    const decoded = jwt_decode(token);

    if(userID === decoded._id){
      console.log("Token Verified")
    } else {
      return next(new CustomErrorHandler('Unauthorized access: Token Verification Failed', 402));
    }

    req.user = {
      _id: decoded._id,
      role: decoded.role
    };
    next();
  } catch (err) {
    return next(new CustomErrorHandler('Unauthorized access', 401));
  }
};


module.exports = auth;
