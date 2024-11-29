
import {TaskRepository} from "@/repositories/TaskRepository";
import type {ITask} from "@/interfaces/ITask";
import {formatDate} from "@/helpers/utilsHelper";

export class TaskService {
    private repository: TaskRepository;

    constructor() {
        this.repository = new TaskRepository();
    }

    async createTask(data: Partial<ITask>) {
        data.dueDate = formatDate(data.dueDate as string);
        return await this.repository.createTask(data);
    }

    async deleteTask(taskId: number) {
        await this.repository.deleteTask(taskId);
    }
}