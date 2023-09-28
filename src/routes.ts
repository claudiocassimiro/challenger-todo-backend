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

export default router;
