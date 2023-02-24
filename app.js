const express = require("express"); // web framework for node.js
const morgan = require("morgan"); // logs
const bodyParser = require("body-parser"); // for parsing data
const mongoose = require("mongoose"); // library for conecting mongoDB and JS or NodeJs environment

const app = express();

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

// setup and connect to DB
mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb+srv://marusenkokhrystyna:" +
    process.env.MONGO_ATLAS_PW +
    "@cluster0.xykrukm.mongodb.net/?retryWrites=true&w=majority",
  () => console.log("Connected to MongoDB")
);

//middlewares
app.use(morgan("dev"));
// the access to images with url
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS, add access for any page to make requests to API
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, PATCH, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/products", productRoutes); // http://localhost:3000/products
app.use("/orders", orderRoutes); // http://localhost:3000/orders

// handle errors, for exsample, there are no route for http://localhost:3000
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
