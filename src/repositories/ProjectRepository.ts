import type {IProject} from "@/interfaces/IProject";


export class ProjectRepository {

    private apiUrl =  import.meta.env.VITE_API_URL;

    async getAllProjects(): Promise<IProject[]> {
        const response = await fetch(`${this.apiUrl}/projects`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        })

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error);
        }

        return response.json();
    }

    async createProject(data: Partial<IProject>): Promise<IProject> {
        const response = await fetch(`${this.apiUrl}/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error);
        }

        return response.json();
    }

    async updateProject(data: Partial<IProject>): Promise<IProject> {
        const response = await fetch(`${this.apiUrl}/projects/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error);
        }

        return response.json();
    }

    async getTasks(projectId: number) {
        const response = await fetch(`${this.apiUrl}/projects/${projectId}/tasks`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error);
        }

        return response.json();
    }

    async deleteProject(projectId: number): Promise<void> {
        const response = await fetch(`${this.apiUrl}/projects/${projectId}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error);
        }
    }
}