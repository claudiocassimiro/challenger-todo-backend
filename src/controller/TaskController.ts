import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Task } from "../entity/Task";
import { User } from "../entity/User";
import { TaskSchema } from "../validations/TaskValidation/createTaskValidationSchema";
import { Repository } from "typeorm";

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
      return res.status(400).json({ error });
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    const taskRepository = AppDataSource.getRepository(Task);
    const { userId } = req;

    if (!userId) {
      return res.sendStatus(404);
    }

    try {
      const tasks = await taskRepository.find({
        where: { user: { id: userId } },
      });

      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const taskRepository = AppDataSource.getRepository(Task);
    const taskId = req.params.id;

    if (!taskId) {
      return res.status(400).json({
        message:
          "Você deve enviar o id da task a ser deletada no parâmetro da url do endpoint",
      });
    }

    try {
      await taskRepository.delete({ id: taskId });

      res.sendStatus(204);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const taskRepository = AppDataSource.getRepository(Task);
    const { id, title, description, completion_data, priority } = req.body;

    try {
      if (!id) {
        throw new Error("O id da task a ser atualizada é obrigatório");
      }

      if (!title && !description && !completion_data && !priority) {
        throw new Error("Envie ao menos um campo para ser atualizado");
      }

      const columnsToBeUpdated = {};

      if (title) {
        columnsToBeUpdated["title"] = title;
      }

      if (description) {
        columnsToBeUpdated["description"] = description;
      }

      if (completion_data) {
        columnsToBeUpdated["completion_data"] = new Date(completion_data);
      }

      if (priority) {
        columnsToBeUpdated["priority"] = priority;
      }

      console.log("columnsToBeUpdated: ", columnsToBeUpdated);

      await taskRepository.update(id, columnsToBeUpdated);

      const updatedTask = await taskRepository.findOne({ where: { id } });

      return res.status(200).json({ updatedTask });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new TaskController();
