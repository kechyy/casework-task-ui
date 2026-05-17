import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskForm from '../TaskForm';

describe('TaskForm', () => {
  it('renders all form fields', () => {
    render(<TaskForm onSubmit={jest.fn()} onCancel={jest.fn()} />);
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/due date/i)).toBeInTheDocument();
  });

  it('calls onCancel when cancel button is clicked', async () => {
    const onCancel = jest.fn();
    render(<TaskForm onSubmit={jest.fn()} onCancel={onCancel} />);
    await userEvent.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('submit button is present and enabled', () => {
    render(<TaskForm onSubmit={jest.fn()} onCancel={jest.fn()} />);
    const button = screen.getByText('Create Task');
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });
});