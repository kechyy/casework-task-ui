import React from 'react';
import { Task, TaskStatus } from '../types/task';

interface Props {
  task: Task;
}

const colourMap: Record<TaskStatus | 'overdue', string> = {
  todo: 'govuk-tag--blue',
  in_progress: 'govuk-tag--yellow',
  done: 'govuk-tag--green',
  overdue: 'govuk-tag--red',
};

const labelMap: Record<TaskStatus | 'overdue', string> = {
  todo: 'To Do',
  in_progress: 'In Progress',
  done: 'Done',
  overdue: 'Overdue',
};

export default function StatusTag({ task }: Props) {
  const key = task.is_overdue ? 'overdue' : task.status;

  return (
    <strong className={`govuk-tag ${colourMap[key]}`}>
      {labelMap[key]}
    </strong>
  );
}