import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskservices: TasksService) { }

  @Get()
  getTasks(@Query() filterTaskDTO: GetTaskFilterDTO): Task[] {
    if (Object.keys(filterTaskDTO).length) {
      return this.taskservices.getFilteredTasks(filterTaskDTO);
    } else {
      return this.taskservices.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    const found = this.taskservices.getTaskById(id);
    if (!found) {
      throw new NotFoundException(`Task with id '${id}' not found !!`);
    }
    return found;
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): any {
    let done = this.taskservices.deleteTaskById(id);
    if(done){
      return {
        "message":`Task with ${id} deleted !!`
      }
    }
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
