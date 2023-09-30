import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import * as bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import "dotenv/config";

class AuthController {
  async authenticate(req: Request, res: Response, next: NextFunction) {
    const userRepository = AppDataSource.getRepository(User);
    const { email, password } = req.body;

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return res.sendStatus(404);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.sendStatus(401);
    }

    const token = sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.json({ userId: user.id, token });
  }
}

export default new AuthController();
