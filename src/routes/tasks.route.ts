import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import TaskController from '@/controllers/tasks.controller';
import { CreateTaskDto, UpdateTaskDto } from '@/dtos/tasks.dto';

class TasksRoute implements Routes {
  public path = '/tasks/';
  public router = Router();
  public tasksController = new TaskController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}create`, authMiddleware, validationMiddleware(CreateTaskDto, 'body'), this.tasksController.create);
    this.router.patch(`${this.path}:id`, authMiddleware, validationMiddleware(UpdateTaskDto, 'body'), this.tasksController.update);
  }
}

export default TasksRoute;
