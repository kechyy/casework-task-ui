import React from 'react';
import { Task, TaskStatus } from '../types/task';
import StatusTag from './StatusTag';

interface Props {
  tasks: Task[];
  onStatusChange: (taskId: number, status: TaskStatus) => Promise<void>;
  onDelete: (taskId: number) => Promise<void>;
}

export default function TaskTable({ tasks, onStatusChange, onDelete }: Props) {
  if (tasks.length === 0) {
    return (
      <p className="govuk-body">
        No tasks found. Create one using the button above.
      </p>
    );
  }

  return (
    <table className="govuk-table">
      <thead className="govuk-table__head">
        <tr className="govuk-table__row">
          <th className="govuk-table__header">Title</th>
          <th className="govuk-table__header">Description</th>
          <th className="govuk-table__header">Due Date</th>
          <th className="govuk-table__header">Status</th>
          <th className="govuk-table__header">Update Status</th>
          <th className="govuk-table__header">Action</th>
        </tr>
      </thead>
      <tbody className="govuk-table__body">
        {tasks.map(task => (
          <TaskRow
            key={task.id}
            task={task}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}

interface RowProps {
  task: Task;
  onStatusChange: (taskId: number, status: TaskStatus) => Promise<void>;
  onDelete: (taskId: number) => Promise<void>;
}

function TaskRow({ task, onStatusChange, onDelete }: RowProps) {
  return (
    <tr className="govuk-table__row">
      <td className="govuk-table__cell">{task.title}</td>

      <td className="govuk-table__cell">
        {task.description || '—'}
      </td>

      <td className="govuk-table__cell">
        {new Date(task.due_date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </td>

      <td className="govuk-table__cell">
        <StatusTag task={task} />
      </td>

      <td className="govuk-table__cell">
        <select
          className="govuk-select"
          value={task.status}
          onChange={e =>
            onStatusChange(task.id, e.target.value as TaskStatus)
          }
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </td>

      <td className="govuk-table__cell">
        <button
          className="govuk-button govuk-button--warning govuk-!-margin-bottom-0"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}