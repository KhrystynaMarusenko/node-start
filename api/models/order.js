const mongoose = require("mongoose");

// a model of our Order for DB

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', require: true },
  quantity: { type: Number, default: 1 },
});

module.exports = mongoose.model("Order", orderSchema);
