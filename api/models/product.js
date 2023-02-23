const mongoose = require("mongoose");

// a model of our Product for DB

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  price: Number,
});

module.exports = mongoose.model('Product', productSchema);