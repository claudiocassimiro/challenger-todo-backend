import { Router } from "express";

import authMiddleware from "./middlewares/authMiddleware";

import UserController from "./controller/UserController";
import AuthController from "./controller/AuthController";

const router = Router();

router.post("/users", UserController.save);
router.post("/login", AuthController.authenticate);
router.get("/tasks", authMiddleware, UserController.allTasks);

export default router;
