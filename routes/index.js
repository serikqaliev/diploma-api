const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const morphRouter = require("./morphRouter");
const semanticRouter = require("./semanticRouter");
const syntaxRouter = require("./syntaxRouter");

router.use("/user", userRouter);
router.use("/syntax", syntaxRouter);
router.use("/semantic", semanticRouter);
router.use("/morph", morphRouter);

module.exports = router;