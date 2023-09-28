import UserController from "./controller/UserController";
import { Router } from "express";

const router = Router();

router.post("/users", UserController.save);

export default router;
