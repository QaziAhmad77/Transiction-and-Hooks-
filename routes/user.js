const {Router} = require("express");
const router = Router();

const controller = require("../controller/user");

router.post("/transection1", controller.transection1);
router.post("/transection2", controller.transection2);
router.post("/transection3", controller.transection3);
router.get("/transection4", controller.transection4);
router.post("/transection5", controller.transection5);
router.post("/transection6", controller.transection6);
router.post("/transection7", controller.transection7);
router.post("/hooks1", controller.hooks1);
router.post("/polyOneTwoMany1", controller.polyOneTwoMany1);
router.post("/polyOneTwoMany2", controller.polyOneTwoMany2);
router.post("/polyOneTwoMany3", controller.polyOneTwoMany3);
router.get("/polyOneTwoMany4", controller.polyOneTwoMany4);
router.get("/polyOneTwoMany5", controller.polyOneTwoMany5);
router.get("/polyOneTwoMany6", controller.polyOneTwoMany6);
router.get("/polyOneTwoMany7", controller.polyOneTwoMany6);
console.log("In routes");
module.exports = router;