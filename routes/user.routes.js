const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middlewares/auth.middlewares");
const Order = require("../models/Order.model");
const User = require("../models/User.model");

router.get("/profile/:id", verifyToken, async (req, res, next) => {
  try {
    const response = await User.findById(req.params.id).select({
      firstName: 1,
      lastName: 1,
      phone: 1,
      address: 1,
      floor: 1,
      letter: 1,
      cp: 1,
      city: 1,
      province: 1,
      photo: 1,
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});
router.put("/profile/:id", verifyToken, async (req, res, next) => {
  try {
    const response = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select({
      firstName: 1,
      lastName: 1,
      phone: 1,
      address: 1,
      floor: 1,
      letter: 1,
      cp: 1,
      city: 1,
      province: 1,
      photo: 1,
    });
    res.status(202).json(response);
  } catch (error) {
    next(error);
  }
});
router.get("/order/:id", verifyToken, async (req, res, next) => {
  try {
    const response = await Order.find({ usuario: req.params.id });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});
router.post("/order", verifyToken, async (req, res, next) => {
  try {
    const response = await Order.create(req.body);
    res.status(201).send("orden creada");
  } catch (error) {
    next(error);
  }
});
router.put("/order", verifyToken, async (req, res, next) => {
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
