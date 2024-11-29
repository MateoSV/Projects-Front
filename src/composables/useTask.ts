
import {ElMessage} from "element-plus";
import type {ITask} from "@/interfaces/ITask";
import {TaskService} from "@/services/TaskService";
import {ref} from "vue";
import {AuthService} from "@/services/AuthService";
import {AuthRepository} from "@/repositories/AuthRepository";
import type {IUser} from "@/interfaces/IUser";

export function useTask() {

    const service = new TaskService();
    const authService = new AuthService(new AuthRepository());
    const tasks = ref<ITask[]>([]);
    const visible = ref(false);
    const task = ref<ITask | null>(null);
    const assingUserShow = ref(false);
    const users = ref<IUser[]>([]);

    const fetchTasks = async () => {
        try {
            tasks.value =  await service.fetchTasks();
        } catch (error) {
            console.error(error);
            ElMessage.error(`Tasks failed: ${error}`);
        }
    }

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

    const updateTask = async (data: Partial<ITask>) => {
        try {
            console.log(data)
            return await service.updateTask(data);
        } catch (error) {
            console.error(error);
            ElMessage.error(`Projects failed: ${error}`);
        }
    }

    const fetchUsers = async () => {
        try {
            users.value = await authService.getUsers();
        } catch (error) {
            console.error(error);
            ElMessage.error(`Users failed: ${error}`);
        }
    }


    return {
        tasks,
        visible,
        task,
        assingUserShow,
        users,
        fetchTasks,
        createTask,
        deleteTask,
        updateTask,
        fetchUsers
    }
}