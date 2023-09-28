import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async save(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const userExists = await this.userRepository.findOne({ where: { email } });

    if (userExists) {
      return res.sendStatus(409);
    }

    const user = this.userRepository.create({ email, password });

    await this.userRepository.save(user);

    return res.json(user);
  }
}
