const Router = require("express"),
      router = new Router(),
      controller = require("../controllers/controllers"),
      {check} = require("express-validator")


router.post("/signin", controller.login);
router.post("/signup", [
    check("email", "Поле с почтой не может быть пустым").notEmpty(),
    check("password", "Пароль должен быть не короче 4 символов").isLength({min: 4})
], controller.registration);
router.get("/info", controller.getUser);
router.get("/latency", controller.getLatency);
router.get("/logout", controller.logout);


module.exports = router;