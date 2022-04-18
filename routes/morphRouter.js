const Router = require("express");
const router = new Router();
const morphController = require("../controllers/morphController")

router.post("/", morphController.create);
router.get("/", morphController.getAll);
router.get("/:id", morphController.getOne);

module.exports = router;