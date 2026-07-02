const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddleware");
const taskController = require("../controllers/taskController");
const authorize = require("../middleware/roleMiddleware");

router.post("/", authenticate, taskController.createTask);
router.get("/", authenticate, taskController.getAllTasks);
router.get("/:id", authenticate, taskController.getTaskById);
router.put("/:id", authenticate, taskController.updateTask);

router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    taskController.deleteTask
);

router.post(
    "/:id/assign",
    authenticate,
    authorize("ADMIN"),
    taskController.assignUsers
);

module.exports = router;