const router = require("express").Router();
const { authMiddleware, roleMiddleware } = require("../middlewares/authMiddleware");
const sessions = require("../controllers/sessionController");

router.post("/", authMiddleware, roleMiddleware("entraineur"), sessions.createSession);
router.get("/", authMiddleware, sessions.getSessions);
router.post("/:id/book", authMiddleware, sessions.bookSession);

module.exports = router;