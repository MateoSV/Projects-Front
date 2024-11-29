import type {ITask} from "@/interfaces/ITask";

export class TaskRepository {

    private apiUrl =  import.meta.env.VITE_API_URL;

    async createTask(data: Partial<ITask>) {
        try {

            const body = {
                name: data.name,
                due_date: data.dueDate,
                project_id: data.projectId,
                status: 'in_progress'
            }

            const response = await fetch(`${this.apiUrl}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(body)
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error);
            }

            return await response.json();
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }

    async deleteTask(taskId: number) {
        const response = await fetch(`${this.apiUrl}/tasks/${taskId}`, {
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