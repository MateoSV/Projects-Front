
import {TaskRepository} from "@/repositories/TaskRepository";
import type {ITask} from "@/interfaces/ITask";
import {formatDate} from "@/helpers/utilsHelper";

export class TaskService {
    private repository: TaskRepository;

    constructor() {
        this.repository = new TaskRepository();
    }

    async fetchTasks(): Promise<ITask[]> {
        return await this.repository.fetchTasks();
    }

    async createTask(data: Partial<ITask>) {
        data.due_date = formatDate(data.due_date as string);
        return await this.repository.createTask(data);
    }

    async deleteTask(taskId: number) {
        await this.repository.deleteTask(taskId);
    }

    async updateTask(data: Partial<ITask>) {
        return await this.repository.updateTask(data);
    }
}