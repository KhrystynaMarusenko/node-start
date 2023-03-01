const express = require("express");
// upload images and storage them
const multer = require("multer");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const ProductsController = require("../controllers/products");

const storage = multer.diskStorage({
  // where to storage
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  // the name of file(must be a STRING)
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

// dif filters about a file, in this case it must be ipeg or png
const fileFilter = (req, file, cb) => {
  // reject a fole
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

//RESTful api

router.get("/", ProductsController.products_get_all);

router.post(
  "/",
  checkAuth,
  upload.single("productImage"),
  ProductsController.products_create_product
);

router.get("/:productId", ProductsController.products_get_product);

router.patch(
  "/:productId",
  checkAuth,
  ProductsController.products_update_product
);

router.delete(
  "/:productId",
  checkAuth,
  ProductsController.products_delete_product
);

module.exports = router;
