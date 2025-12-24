const Order = require('../models/order');

const createOrder = async (req, res, next) => {
  try {
    const { userID, name, contactno, address, cartItems, cartTotal } = req.body;

    // const order = Order.findOne({user:userID})

    // if(order){
    //     // order.products = [order.products, ...cartItems],
    //     // order.name = name,
    //     // order.contactno = contactno,
    //     // order.address = address
    //     // order.total = order.total + cartTotal
    //     await Order.findOneAndUpdate({user:userID},{name, contactno, address, products:cartItems, total:cartTotal},{new:true})
    //     // await order.save();
    // }
    // else{
        const order = new Order({
        user:userID,
        products:cartItems,
        name:name,
        contactno:contactno,
        address:address,
        total:cartTotal
      });
      await order.save();
    // }
    
    res.status(201).json({ message: 'Order created successfully.' });
  } catch (error) {
    next(error);
  }
};

// const getOrdersByUser = async (req, res, next) => {
//   try {
//     const userId = req.params.userId;
//     const orders = await Order.find({ userId });
//     res.status(200).json({ orders });
//   } catch (error) {
//     next(error);
//   }
// };

const getOrdersByUser = async (req, res, next) => {
  try {
    const userId = req.query._id;
    // console.log(userId)
    const orders = await Order.find({ user: userId });
    res.status(200).json({ orders });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrdersByUser
};
