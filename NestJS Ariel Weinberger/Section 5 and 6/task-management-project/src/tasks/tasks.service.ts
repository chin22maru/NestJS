/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './dto/task.entity';
import { TaskStatus } from './dto/task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './tasks.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()   // making this injactable makes it singlton that can be shared across the apps 
export class TasksService {
    constructor(private readonly taskRepository: TaskRepository) {}

    async getTaskById(id: string, user: User): Promise<Task> {
        const found = await this.taskRepository.findOne({ where: { id, user } });
        if (!found) throw new NotFoundException(`Task with ID "${id}" not found`);
        return found;
    }

    async deleteTask(id: string, user: User) : Promise<void>{
        const res = await this.taskRepository.delete({id,user})
        if(res.affected === 0) throw new NotFoundException(`Task with ID "${id}" not found`);
        console.log(res)
    }

    getTasks(filterDto: GetTasksFilterDto, user: User) : Promise<Task[]>{
        return this.taskRepository.getTasks(filterDto, user)
    }

    createTask(createTaskDto: CreateTaskDto, user: User) : Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user)
    }


    async updateTaskStatus(id: string, status: TaskStatus, user: User) : Promise<Task>{
        const task = await this.getTaskById(id,user)
        task.status = status
        await this.taskRepository.save(task)
        return task
    }
}
