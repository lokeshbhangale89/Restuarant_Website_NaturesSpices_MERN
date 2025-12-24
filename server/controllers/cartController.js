const CustomErrorHandler = require("../services/CustomErrorHandler");
const Cart = require("../models/cart");


const addToCartController = async (req, res, next) => {
  // console.log(req.body)
  const { userID, product, quantity } = req.body;

  const userId = userID;

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({
      user: userId,
      products: [{ product: product, quantity: 1 }],
    });
  } else {
    let itemIndex = cart.products.findIndex((p) => p.product == product);

    if (itemIndex > -1) {
      let productItem = cart.products[itemIndex];
      productItem.quantity += 1;
      cart.products[itemIndex] = productItem;
    } else {
      cart.products.push({ product: product, quantity: 1 });
    }
  }

  try {
    const result = await cart.save();
    res.status(201).json({
      message: "Item added to cart",
      result: result,
    });
  } catch (error) {
    return next(error);
  }
};


async function getCartTotal(userId) {
  try {
    let total=0; 
    const cart = await Cart.findOne({ user: userId });
    if(!cart.products || cart.products.length === 0){
      return total;
    }
    for (const item of cart.products) {
      if(item.product && item.product.price && item.quantity){
      total += item.product.price * item.quantity;
      }
    }
    return total;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get cart total');
  }
}

const getCartController = async (req, res, next) => {
  const userId = req.query._id;

  try {
    let usercart = await Cart.findOne({ user: userId });
    if(!usercart){
      const cart = new Cart({
        user: userId,
        products: [],
      });

      await cart.save()
    }
    
    const cart = await Cart.findOne({ user: userId }).populate(
      "products.product"
      );
      const total = await getCartTotal(userId);

    // const total = await getCartTotal(userId);
    const cartItems = cart.products.map((item) => ({
      id: item._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      imageUrl: item.product.imageUrl
    }));
    
    const response = {
      cart: cartItems,
      total,
    };
    res.json(response);
  } catch (error) {
    return next(error);
  }
};

const deleteCartItem = async (req, res, next) => {
    const userId = req.user._id;
    const productId = req.query.productId;
  
    try {
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        return next(new CustomErrorHandler("Cart is empty", 404));
      }  
      // find the index of the product in the cart
      const productIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );
  
      if (!productIndex) {
        return next(new CustomErrorHandler("Product not found in cart", 404));
      }
  
      cart.products.splice(productIndex, 1);
      await cart.save();
  
      res.status(200).json({
        message: "Product removed from cart successfully",
      });
    } catch (error) {
      return next(error);
    }
  }

  const deleteAllFromcart = async (req, res, next) => {
    const userId = req.user._id;
  
    try {
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        return next(new CustomErrorHandler("Cart is empty", 404));
      }
  
      cart.products = [];
      await cart.save();
  
      res.status(200).json({
        message: "Product removed from cart successfully",
      });
    } catch (error) {
      return next(error);
    }
  }


module.exports = {
  addToCartController,
  getCartController,
  deleteCartItem,
  deleteAllFromcart
};

