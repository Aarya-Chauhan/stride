// frontend/src/api/tasks.ts
import api from "./client";
import type { Task } from "../types/task";

export const fetchTasksRequest = async (): Promise<Task[]> => {
  const res = await api.get<{ tasks: Task[] }>("/api/tasks");
  return res.data.tasks;
};

export const createTaskRequest = async (
  title: string
): Promise<Task> => {
  const res = await api.post<{ task: Task }>("/api/tasks", { title });
  return res.data.task;
};

export const updateTaskRequest = async (
  id: string,
  updates: Partial<Pick<Task, "title" | "isCompleted">>
): Promise<Task> => {
  const res = await api.patch<{ task: Task }>(`/api/tasks/${id}`, updates);
  return res.data.task;
};

export const deleteTaskRequest = async (id: string): Promise<void> => {
  await api.delete(`/api/tasks/${id}`);
};
