const mongoose = require("mongoose");

const Order = require("../models/order");
const Product = require("../models/product");

exports.orders_get_all = (req, res, next) => {
  Order.find()
    .select("-__v")
    .populate("product", "name")
    // .populate('product', "-__v")
    .exec()
    .then((orders) => {
      const response = {
        count: orders.length,
        orders: orders.map((order) => {
          return {
            _id: order._id,
            product: order.product,
            quantity: order.quantity,
            requestAnOrder: {
              type: "GET",
              description: "Get order",
              url: `http://localhost:3000/orders/${order._id}`,
            },
            requestProduct: {
              type: "GET",
              description: "Get product",
              url: `http://localhost:3000/products/${order.product}`,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.orders_create_order = (req, res, next) => {
  Product.findById(req.body.productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity,
      });
      return order.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "Created order successfully",
        createdOrder: {
          quantity: result.quantity,
          product: result.product,
          _id: result._id,
          request: {
            type: "GET",
            url: `http://localhost:3000/orders/${result._id}`,
          },
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Product not found",
        error: err,
      });
    });
};

exports.orders_get_order = (req, res, next) => {
  const id = req.params.orderId;

  Order.findById(id)
    .select("-__v")
    .populate("product", "-__v")
    .exec()
    .then((order) => {
      if (order) {
        res.status(200).json({
          order: order,
          requestProduct: {
            type: "GET",
            description: "Get product",
            url: `http://localhost:3000/products/${order.product}`,
          },
          request: {
            type: "GET",
            description: "Get ALL orders",
            url: "http://localhost:3000/orders/",
          },
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.orders_delete_order = (req, res, next) => {
  const id = req.params.orderId;

  Order.deleteOne({ _id: id })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "GET",
          description: "Get ALL orders",
          url: "http://localhost:3000/orders/",
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
