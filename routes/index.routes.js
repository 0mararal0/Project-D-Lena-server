const router = require("express").Router();
const Product = require("../models/Product.model");

const authRouter = require("./auth.routes");
router.use("/auth", authRouter);

const adminRouter = require("./admin.routes");
router.use("/admin", adminRouter);

const userRouter = require("./user.routes");
router.use("/user", userRouter);
router.get("/product/:product", async (req, res, next) => {
  try {
    const response = await Product.find({ category: req.params.product });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
