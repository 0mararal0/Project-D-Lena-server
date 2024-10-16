const router = require("express").Router();

const authRouter = require("./auth.routes");
router.use("/auth", authRouter);
/*
const adminRouter = require("./admin.routes");
router.use("/admin", adminRouter);
*/

const userRouter = require("./user.routes");
router.use("/user", userRouter);

module.exports = router;
