// contract between front end and backend
export interface Todo {
    userId: number;
    id?: number;
    title: string;
    completed: boolean;
}