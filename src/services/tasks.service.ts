import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { PrismaClient, Task, User } from '@prisma/client';
import { SECRET_KEY } from '@config';
import { CreateUserDto, LoginUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { isEmpty } from '@utils/util';
import { CreateTaskDto, UpdateTaskDto } from '@/dtos/tasks.dto';

class TasksService {
  public tasks = new PrismaClient().task;

  public async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = await this.tasks.create({ data: { title, description, userId: user.id } });
    return task;
  }

  public async update(updateTaskDto: UpdateTaskDto, user: User, id: number): Promise<{}> {
    const { status } = updateTaskDto;

    const task = await this.tasks.findUnique({ where: { id } });
    if (!task) throw new HttpException(404, 'Task not found');
    if (task.userId !== user.id) {
      throw new HttpException(401, 'unauthorized');
    } else {
      const updated = await this.tasks.update({ where: { id }, data: { status } });
      return updated;
    }
  }
}

export default TasksService;
