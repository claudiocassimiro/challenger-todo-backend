import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";

class UserController {
  async save(req: Request, res: Response, next: NextFunction) {
    const userRepository = AppDataSource.getRepository(User);
    const { email, password } = req.body;

    const userExists = await userRepository.findOne({ where: { email } });

    if (userExists) {
      return res.sendStatus(409);
    }

    const user = userRepository.create({ email, password });

    await userRepository.save(user);

    return res.status(200).json(user);
  }
}

export default new UserController();
