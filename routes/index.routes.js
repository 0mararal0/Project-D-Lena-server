const router = require("express").Router();
const Product = require("../models/Product.model");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

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

const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);

module.exports = router;
