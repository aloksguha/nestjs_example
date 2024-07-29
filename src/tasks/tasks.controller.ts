import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskservices: TasksService) { }

  @Get()
  getTasks(@Query() filterTaskDTO : GetTaskFilterDTO): Task[] {
    if(Object.keys(filterTaskDTO).length){
      return this.taskservices.getFilteredTasks(filterTaskDTO);
    }else{
      return this.taskservices.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id:string): Task {
    return this.taskservices.getTaskById(id)
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id:string): any {
    return this.taskservices.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.taskservices.updateTaskStatus(id, status);
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.taskservices.createTask(createTaskDTO);
  }
}
