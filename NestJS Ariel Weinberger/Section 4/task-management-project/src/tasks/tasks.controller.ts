import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './dto/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService){}

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto) : Promise<Task[]> {
        return this.tasksService.getTasks(filterDto)
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) : Promise<Task> {
        return this.tasksService.createTask(createTaskDto)
    }

    @Get(':id')
    getTaskById(@Param('id') id: string) : Promise<Task> {
        return this.tasksService.getTaskById(id)
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string): Promise<void> {
        return this.tasksService.deleteTask(id)
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto) : Promise<Task> {
        const {status} = updateTaskStatusDto
        return this.tasksService.updateTaskStatus(id, status)
    }
}
