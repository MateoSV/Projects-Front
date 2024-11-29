
import {ElMessage} from "element-plus";
import type {ITask} from "@/interfaces/ITask";
import {TaskService} from "@/services/TaskService";

export function useTask() {

    const service = new TaskService();

    const createTask = async (data: Partial<ITask>) => {
        try {
            return await service.createTask(data);
        } catch (error) {
            console.error(error);
            ElMessage.error(`Task failed: ${error}`);
        }
    }

    const deleteTask = async (taskId: number) => {
        try {
            await service.deleteTask(taskId);
        } catch (error) {
            console.error(error);
            ElMessage.error(`Projects failed: ${error}`);
        }
    }

    return {
        createTask,
        deleteTask
    }
}