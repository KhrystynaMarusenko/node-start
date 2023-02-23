const mongoose = require("mongoose");

// a model of our Product for DB

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, require: true },
  price: { type: Number, require: true },
});

module.exports = mongoose.model("Product", productSchema);
