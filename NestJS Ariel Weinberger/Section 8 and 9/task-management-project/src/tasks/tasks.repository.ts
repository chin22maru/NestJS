/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/only-throw-error */
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from './dto/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './dto/task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
    logger = new Logger('TaskRepository', {timestamp: true})
    constructor(private readonly dataSource: DataSource) {
        super(Task, dataSource.createEntityManager()); // ✅ Correct way to extend Repository
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
            user,
        });

        await this.save(task);
        return task;
    }

    async getTasks(filterDto: GetTasksFilterDto, user: User) : Promise<Task[]>{
        const {status,search} = filterDto
        const query = this.createQueryBuilder('task')
        query.where({user})

        if(status){
            query.andWhere('task.status = :status', {status})
        }
        
        if(search){
            query.andWhere(
                '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
                {search: `%${search}%`}
            )
        }
        
        try{
            const tasks = await query.getMany()
            return tasks
        } catch(e) {
            this.logger.error(`Failed to get tasks for user "${user.username}". Filters: ${JSON.stringify(filterDto)}`, 
            e.stack,)
            throw new InternalServerErrorException();
        }
    }
}
