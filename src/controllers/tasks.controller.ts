import { NextFunction, Response } from 'express';
import { Task, User } from '@prisma/client';
import TasksService from '@/services/tasks.service';
import { CreateTaskDto, UpdateTaskDto } from '@/dtos/tasks.dto';
import { RequestWithUser } from '@/interfaces/auth.interface';

class TaskController {
  public tasksService = new TasksService();

  public create = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const taskData: CreateTaskDto = req.body;
      const user: User = req.user;
      const createdTaskData: Task = await this.tasksService.create(taskData, user);

      res.status(201).json({ data: createdTaskData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public update = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;

      const status: UpdateTaskDto = req.body;
      const user: User = req.user;

      const task = await this.tasksService.update(status, user, Number(id));

      res.status(200).json({ task, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
  public delete = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;

      const user: User = req.user;

      await this.tasksService.delete(user, Number(id));

      res.status(200).json({ message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default TaskController;
