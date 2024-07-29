import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[]  = [
    {
      "id": "1",
      "title": "alok",
      "desc": "ssdf",
      "status": TaskStatus.OPEN
    }
  ];

  getAllTasks(): Task[]{
    return this.tasks;
  }

  getFilteredTasks(filterTaskDTO : GetTaskFilterDTO): Task[]{
    const{status, search} = filterTaskDTO;
    console.log('search',search)
    let tasks = this.getAllTasks();
    if(search){
      tasks = tasks.filter((task)=> {
        if(task.title.includes(search) || task.desc.includes(search)){
          return true;
        }
        return false;
      })

    }

    console.log('st',status)
    if(status){
      tasks = tasks.filter((task)=> task.status === status.toUpperCase())
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task)=> task.id === id)
  }

  deleteTaskById(id: string): void {
    this.tasks = this.tasks.filter((task)=> task.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, desc } = createTaskDTO
    const task: Task = {
      id: uuid(),
      title,
      desc,
      status: TaskStatus.OPEN
    }
    this.tasks.push(task);
    return task;
  }
}
