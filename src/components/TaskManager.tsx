import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import TaskForm from './TaskForm';
import TaskTable from './TaskTable';

export default function TaskManager() {
  const { tasks, loading, error, createTask, updateStatus, removeTask } = useTasks();
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <header className="govuk-header" role="banner">
        <div className="govuk-header__container govuk-width-container">
          <div className="govuk-header__content">
            <span className="govuk-header__service-name">
              HMCTS Task Manager
            </span>
          </div>
        </div>
      </header>

      <div className="govuk-width-container">
        <main className="govuk-main-wrapper" id="main-content" role="main">

          <h1 className="govuk-heading-l">Caseworker Tasks</h1>

          {error && (
            <div className="govuk-error-summary" data-module="govuk-error-summary">
              <h2 className="govuk-error-summary__title">There is a problem</h2>
              <p className="govuk-body">{error}</p>
            </div>
          )}

          {!showForm && (
            <button
              className="govuk-button govuk-!-margin-bottom-6"
              onClick={() => setShowForm(true)}
            >
              + New Task
            </button>
          )}

          {showForm && (
            <TaskForm
              onSubmit={async payload => {
                await createTask(payload);
                setShowForm(false);
              }}
              onCancel={() => setShowForm(false)}
            />
          )}

          {loading ? (
            <p className="govuk-body">Loading tasks...</p>
          ) : (
            <TaskTable
              tasks={tasks}
              onStatusChange={updateStatus}
              onDelete={removeTask}
            />
          )}

        </main>
      </div>
    </div>
  );
}