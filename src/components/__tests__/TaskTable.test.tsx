import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskTable from '../TaskTable';

const tasks = [
  {
    id: 1,
    title: 'Review witness statements',
    description: 'Cross-reference with case file 2024/CR/4412',
    status: 'todo' as const,
    due_date: '2027-06-01T09:00:00Z',
    created_at: '2026-01-01T09:00:00Z',
    is_overdue: false,
  },
  {
    id: 2,
    title: 'File court order',
    description: null,
    status: 'done' as const,
    due_date: '2027-07-01T09:00:00Z',
    created_at: '2026-01-01T09:00:00Z',
    is_overdue: false,
  },
];

describe('TaskTable', () => {
  it('shows empty state when there are no tasks', () => {
    render(
      <TaskTable
        tasks={[]}
        onStatusChange={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    expect(screen.getByText(/no tasks found/i)).toBeInTheDocument();
  });

  it('renders all tasks passed to it', () => {
    render(
      <TaskTable
        tasks={tasks}
        onStatusChange={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    expect(screen.getByText('Review witness statements')).toBeInTheDocument();
    expect(screen.getByText('File court order')).toBeInTheDocument();
  });

  it('shows a dash for tasks without a description', () => {
    render(
      <TaskTable
        tasks={tasks}
        onStatusChange={jest.fn()}
        onDelete={jest.fn()}
      />
    );
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('calls onDelete with the correct task id', async () => {
    const onDelete = jest.fn();
    render(
      <TaskTable
        tasks={tasks}
        onStatusChange={jest.fn()}
        onDelete={onDelete}
      />
    );
    const deleteButtons = screen.getAllByText('Delete');
    await userEvent.click(deleteButtons[0]);
    expect(onDelete).toHaveBeenCalledWith(1);
  });
});