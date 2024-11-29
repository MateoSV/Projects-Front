import { ref } from 'vue';
import { ProjectService } from '@/services/ProjectService';
import type { IProject } from '@/interfaces/IProject';
import {ElMessage} from "element-plus";

export function useProjects() {
    const service = new ProjectService();
    const projects = ref<IProject[]>([]);
    const visible = ref(false);
    const visibleEdit = ref(false);
    const project = ref<IProject | null>(null);

    const fetchProjects = async () => {
        try {
            projects.value = await service.getAllProjects();
        } catch (error) {
            console.error(error);
            ElMessage.error(`Projects Failed: ${error}`);
        }
    };

    const createProject = async (data: Partial<IProject>) => {
        try {
            return await service.createProject(data);
        } catch (error) {
            console.error(error);
            ElMessage.error(`Projects failed: ${error}`);
        }
    }

    const updateProject = async (data: Partial<IProject>) => {
        try {
            return await service.updateProject(data);
        } catch (error) {
            console.error(error);
            ElMessage.error(`Projects failed: ${error}`);
        }
    }

    const getTasks = async (projectId: number) => {
        try {
            return await service.getTasks(projectId);
        } catch (error) {
            console.error(error);
            ElMessage.error(`Projects failed: ${error}`);
        }
    }

    const deleteProject = async (projectId: number): Promise<void> => {
        try {
            await service.deleteProject(projectId);
        } catch (error) {
            console.error(error);
            ElMessage.error(`Projects failed: ${error}`);
        }
    }

    return {
        projects,
        visible,
        visibleEdit,
        project,
        fetchProjects,
        createProject,
        updateProject,
        getTasks,
        deleteProject
    };
}