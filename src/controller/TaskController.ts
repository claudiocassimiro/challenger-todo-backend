import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Task } from "../entity/Task";
import { User } from "../entity/User";
import { TaskSchema } from "../validations/TaskValidation/createTaskValidationSchema";

class TaskController {
  async save(req: Request, res: Response, next: NextFunction) {
    const taskRepository = AppDataSource.getRepository(Task);
    const userRepository = AppDataSource.getRepository(User);

    const { title, description, completion_data, priority } = req.body;
    const { userId } = req;

    if (!userId) {
      return res.sendStatus(404);
    }

    try {
      const isValidData = TaskSchema.parse({
        title,
        description,
        completion_data: new Date(completion_data),
        priority,
      });

      if (!isValidData) {
        throw new Error();
      }

      const user = await userRepository.findOne({ where: { id: userId } });

      if (!user) {
        return res.sendStatus(404);
      }

      const task = taskRepository.create({
        title,
        description: description ? description : "",
        completion_data: new Date(completion_data),
        priority,
      });

      task.user = user;

      await taskRepository.save(task);

      delete task.user;

      return res.status(200).json(task);
    } catch (error) {
      return res.json({ error });
    }
  }
}

export default new TaskController();
