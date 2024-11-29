import type { IProject } from '@/interfaces/IProject';
import { ProjectRepository } from '@/repositories/ProjectRepository';

export class ProjectService {
    private repository: ProjectRepository;

    constructor() {
        this.repository = new ProjectRepository();
    }

    async getAllProjects(): Promise<IProject[]> {
        return this.repository.getAllProjects();
    }

    async createProject(data: Partial<IProject>): Promise<IProject> {
        return this.repository.createProject(data);
    }

    async updateProject(data: Partial<IProject>): Promise<IProject> {
        return this.repository.updateProject(data);
    }

    async getTasks(projectId: number) {
        return this.repository.getTasks(projectId);
    }

    async deleteProject(projectId: number): Promise<void> {
        return this.repository.deleteProject(projectId);
    }
}