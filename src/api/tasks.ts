import axios from 'axios';
import { Task, CreateTaskPayload, TaskStatus } from '../types/task';

const api = axios.create({
  baseURL: 'http://localhost:8001',
});

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get('/tasks/');
  return response.data;
};

export const createTask = async (payload: CreateTaskPayload): Promise<Task> => {
  const response = await api.post('/tasks/', payload);
  return response.data;
};

export const updateTaskStatus = async (
  taskId: number,
  status: TaskStatus
): Promise<Task> => {
  const response = await api.patch(`/tasks/${taskId}/status`, { status });
  return response.data;
};

export const deleteTask = async (taskId: number): Promise<void> => {
  await api.delete(`/tasks/${taskId}`);
};