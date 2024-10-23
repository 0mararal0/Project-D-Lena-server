const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { verifyToken, verifyAdmin } = require("../middlewares/auth.middlewares");
const Product = require("../models/Product.model");
const Order = require("../models/Order.model");
const User = require("../models/User.model");

router.get("/product", verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const response = await Product.find({});
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});
router.post("/product", verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const response = await Product.create(req.body);
    res.status(201).send("Producto creado");
  } catch (error) {
    next(error);
  }
});
router.put("/product/:id", verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const response = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(202).json(response);
  } catch (error) {
    next(error);
  }
});
router.delete(
  "/product/:id",
  verifyToken,
  verifyAdmin,
  async (req, res, next) => {
    try {
      const response = await Product.findByIdAndDelete(req.params.id);
      res.sendStatus(202);
    } catch (error) {
      next(error);
    }
  }
);
router.put("/user/:id", verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const response = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(202).json(response);
  } catch (error) {
    next(error);
  }
});
router.get("/user", verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const response = await User.find({});
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});
router.get("/user/:id", verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const response = await User.findById(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});
router.get("/order", verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const response = await Order.find({});
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});
router.put("/order/:id", verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const response = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(202).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
