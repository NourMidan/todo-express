import { PrismaClient, Task, User } from '@prisma/client';
import { HttpException } from '@exceptions/HttpException';
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
  public async delete(user: User, id: number): Promise<Task> {
    const task = await this.tasks.findUnique({ where: { id } });
    if (!task) throw new HttpException(404, 'Task not found');
    if (task.userId !== user.id) {
      throw new HttpException(401, 'unauthorized');
    } else {
      const updated = await this.tasks.delete({ where: { id } });
      return updated;
    }
  }
}

export default TasksService;
