import React from 'react';
import { render, screen } from '@testing-library/react';
import StatusTag from '../StatusTag';

const buildTask = (status: any, is_overdue = false) => ({
  id: 1,
  title: 'Chase solicitor for missing documents',
  description: null,
  status,
  due_date: '2027-06-01T09:00:00Z',
  created_at: '2026-01-01T09:00:00Z',
  is_overdue,
});

describe('StatusTag', () => {
  it('shows To Do for a task not yet started', () => {
    render(<StatusTag task={buildTask('todo')} />);
    expect(screen.getByText('To Do')).toBeInTheDocument();
  });

  it('shows In Progress for an active task', () => {
    render(<StatusTag task={buildTask('in_progress')} />);
    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });

  it('shows Done for a completed task', () => {
    render(<StatusTag task={buildTask('done')} />);
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  it('shows Overdue regardless of status when past due date', () => {
    render(<StatusTag task={buildTask('todo', true)} />);
    expect(screen.getByText('Overdue')).toBeInTheDocument();
  });

  it('does not show Overdue for a completed task even if date passed', () => {
    render(<StatusTag task={buildTask('done', false)} />);
    expect(screen.getByText('Done')).toBeInTheDocument();
    expect(screen.queryByText('Overdue')).not.toBeInTheDocument();
  });
});