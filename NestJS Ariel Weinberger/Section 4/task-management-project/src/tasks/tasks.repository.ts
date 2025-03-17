import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from './dto/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './dto/task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TaskRepository extends Repository<Task> {
    constructor(private readonly dataSource: DataSource) {
        super(Task, dataSource.createEntityManager()); // ✅ Correct way to extend Repository
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = this.create({
            title,
            description,
            status: TaskStatus.OPEN,
        });

        await this.save(task);
        return task;
    }

    async getTasks(filterDto: GetTasksFilterDto) : Promise<Task[]>{
        const {status,search} = filterDto
        const query = this.createQueryBuilder('task')
        
        if(status){
            query.andWhere('task.status = :status', {status})
        }
        
        if(search){
            query.andWhere(
                'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
                {search: `%${search}%`}
            )
        }
        
        const tasks = await query.getMany()
        return tasks
    }
}
