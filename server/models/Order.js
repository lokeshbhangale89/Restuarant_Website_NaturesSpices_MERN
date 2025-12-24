const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name:{
    type:String,
    required:true
  },
  contactno:{
    type:String,
    required:true
  },
  address:{
    type:String,
    required:true
  },
  products: {
    type: Array,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
