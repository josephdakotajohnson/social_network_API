const router = require("express").Router();
const thoughtRoutes = require("./thought_Routes");
const userRoutes = require("./user_Routes");

router.use("/thoughts", thoughtRoutes);
router.use("/users", userRoutes);

module.exports = router;