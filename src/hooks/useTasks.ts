import { useState, useEffect, useCallback } from 'react';
import { Task, TaskStatus, CreateTaskPayload } from '../types/task';
import * as api from '../api/tasks';

interface UseTasksReturn {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  createTask: (payload: CreateTaskPayload) => Promise<void>;
  updateStatus: (taskId: number, status: TaskStatus) => Promise<void>;
  removeTask: (taskId: number) => Promise<void>;
}

export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      const data = await api.getTasks();
      setTasks(data);
    } catch {
      setError('Failed to load tasks. Make sure the API is running.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (payload: CreateTaskPayload) => {
    await api.createTask(payload);
    await fetchTasks();
  };

  const updateStatus = async (taskId: number, status: TaskStatus) => {
    await api.updateTaskStatus(taskId, status);
    await fetchTasks();
  };

  const removeTask = async (taskId: number) => {
    await api.deleteTask(taskId);
    await fetchTasks();
  };

  return { tasks, loading, error, createTask, updateStatus, removeTask };
}