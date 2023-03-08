const Router = require("express"),
      router = new Router(),
      controller = require("../controllers/controllers")


router.post("/signin", controller.login);
router.post("/signup", controller.registration);
router.get("/info", controller.getUser);
router.get("/latency", controller.getLatency);
router.get("/logout", controller.logout);


module.exports = router;