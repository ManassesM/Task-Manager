import { Injectable } from '@angular/core';
import { Task } from './modules/task.module';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService: WebRequestService) { }

  getLists() {
    return this.webRequestService.get('lists');
  }

  getTasks(listId: string) {
    return this.webRequestService.get(`lists/${listId}/tasks`);
  }

  deleteList(id: string) {
    return this.webRequestService.delete(`lists/${id}`);
  }

  deleteTask(listId: string, taskId: string) {
    return this.webRequestService.delete(`lists/${listId}/tasks/${taskId}`);
  }

  createList(title: string) {
    // We want to send a web request to create a list
    return this.webRequestService.post('lists', { title });
  }

  createTask(title: string, listId: string) {
    // We want to send a web request to create a task
    return this.webRequestService.post(`lists/${listId}/tasks`, { title });
  }

  updateList(id: string, title: string) {
    // We want to send a web request to update a list
    return this.webRequestService.patch(`lists/${id}`, { title });
  }

  updateTask(listId: string, taskId: string, title: string) {
    // We want to send a web request to update a task
    return this.webRequestService.patch(`lists/${listId}/tasks/${taskId}`, { title });
  }

  complete(task: Task) {
    return this.webRequestService.patch(`lists/${task._listId}/tasks/${task._id}`, {
      completed: !task.completed
    });
  }

}
