import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import TaskForm from './TaskForm';
import TaskTable from './TaskTable';

type View = 'list' | 'create';

export default function TaskManager() {
  const { tasks, loading, error, createTask, updateStatus, removeTask } = useTasks();
  const [view, setView] = useState<View>('list');

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
        <div className="govuk-phase-banner">
          <p className="govuk-phase-banner__content">
            <strong className="govuk-tag govuk-phase-banner__content__tag">
              Beta
            </strong>
            <span className="govuk-phase-banner__text">
              This is a new service — your feedback will help us improve it.
            </span>
          </p>
        </div>

        <main className="govuk-main-wrapper" id="main-content" role="main">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-full">

              {view === 'list' && (
                <>
                  <div className="govuk-!-display-inline-block govuk-!-width-full">
                    <h1 className="govuk-heading-xl govuk-!-display-inline-block">
                      Caseworker Tasks
                    </h1>
                    <button
                      className="govuk-button govuk-!-margin-left-3"
                      style={{ float: 'right', marginTop: '1rem' }}
                      onClick={() => setView('create')}
                    >
                      Create new task
                    </button>
                  </div>

                  <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />

                  {error && (
                    <div className="govuk-error-summary">
                      <h2 className="govuk-error-summary__title">
                        There is a problem
                      </h2>
                      <p className="govuk-body">{error}</p>
                    </div>
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
                </>
              )}

              {view === 'create' && (
                <>
                  <nav className="govuk-breadcrumbs govuk-!-margin-bottom-6">
                    <ol className="govuk-breadcrumbs__list">
                      <li className="govuk-breadcrumbs__list-item">
                        <button
                          className="govuk-link"
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                          onClick={() => setView('list')}
                        >
                          Caseworker Tasks
                        </button>
                      </li>
                      <li className="govuk-breadcrumbs__list-item">
                        Create new task
                      </li>
                    </ol>
                  </nav>

                  <h1 className="govuk-heading-xl">Create new task</h1>

                  <TaskForm
                    onSubmit={async payload => {
                      await createTask(payload);
                      setView('list');
                    }}
                    onCancel={() => setView('list')}
                  />
                </>
              )}

            </div>
          </div>
        </main>
      </div>

      <footer className="govuk-footer" role="contentinfo">
        <div className="govuk-width-container">
          <div className="govuk-footer__meta">
            <div className="govuk-footer__meta-item">
              <span className="govuk-footer__licence-description">
                Built for HMCTS — His Majesty's Courts and Tribunals Service
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}