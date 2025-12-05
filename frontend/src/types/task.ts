// frontend/src/types/task.ts
export interface Task {
  _id: string;
  title: string;
  description?: string;
  dueDate?: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}
