import { Router } from "express";

import authMiddleware from "./middlewares/authMiddleware";

import UserController from "./controller/UserController";
import AuthController from "./controller/AuthController";
import TaskController from "./controller/TaskController";

const router = Router();

router.post("/users", UserController.save);
router.post("/login", AuthController.authenticate);
router.post("/tasks", authMiddleware, TaskController.save);
router.get("/tasks", authMiddleware, TaskController.getAll);
router.delete("/tasks/:id", authMiddleware, TaskController.delete);
router.put("/tasks", authMiddleware, TaskController.update);
router.post(
  "/tasks/update/status",
  authMiddleware,
  TaskController.updateTaskStatus
);

export default router;
