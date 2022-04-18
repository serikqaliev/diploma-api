const Router = require("express");
const router = new Router();
const semanticController = require("../controllers/semanticController")

router.post("/", semanticController.create);
router.get("/", semanticController.getAll);
router.get("/:id", semanticController.getOne);

module.exports = router;