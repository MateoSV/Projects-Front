export interface ITask {
    id: number;
    name: string;
    project_id: number;
    user_id: number | null;
    status: string;
    due_date: string;
}