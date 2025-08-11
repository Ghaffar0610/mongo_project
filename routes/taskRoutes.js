const express = require("express");
const { getTasks, addTask, deleteTask, updateTask } = require("../controllers/taskController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Protect all task routes with authentication
router.use(auth);

router.get("/", getTasks);
router.post("/", addTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
