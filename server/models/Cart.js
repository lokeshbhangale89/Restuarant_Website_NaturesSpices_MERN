const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: {
    type: Array,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
