const Router = require("express");
const router = new Router();
const syntaxController = require("../controllers/syntaxController")
const authMiddleware = require("../middleware/AuthMiddleware");

router.post("/", authMiddleware, syntaxController.create);
router.get("/", authMiddleware, syntaxController.getAll);
router.get("/:id", authMiddleware, syntaxController.getOne);

module.exports = router;