const router = require("express").Router();
const users = require("../controllers/userController");
const { authMiddleware, roleMiddleware } = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, roleMiddleware("entraineur"), users.getAllUsers);
router.get("/:id", authMiddleware, users.getUserById);
router.put("/:id", authMiddleware, users.updateUser);
router.delete("/:id", authMiddleware, users.deleteUser);
module.exports = router;