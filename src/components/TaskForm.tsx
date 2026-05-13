import React, { useState } from 'react';
import { CreateTaskPayload, TaskStatus } from '../types/task';

interface Props {
  onSubmit: (payload: CreateTaskPayload) => Promise<void>;
  onCancel: () => void;
}

const emptyForm = {
  title: '',
  description: '',
  status: 'todo' as TaskStatus,
  due_date: '',
};

export default function TaskForm({ onSubmit, onCancel }: Props) {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit({
        ...form,
        due_date: new Date(form.due_date).toISOString(),
      });
      setForm(emptyForm);
    } catch (err: any) {
      const detail = err.response?.data?.detail;
      if (Array.isArray(detail)) {
        setError(detail.map((d: any) => d.msg).join(', '));
      } else {
        setError(detail || 'Something went wrong. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="govuk-!-margin-bottom-6">
      <h2 className="govuk-heading-m">New Task</h2>

      {error && (
        <div className="govuk-error-summary">
          <h2 className="govuk-error-summary__title">There is a problem</h2>
          <p className="govuk-body">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="govuk-form-group">
          <label className="govuk-label" htmlFor="title">
            Title
          </label>
          <input
            className="govuk-input"
            id="title"
            type="text"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>

        <div className="govuk-form-group">
          <label className="govuk-label" htmlFor="description">
            Description <span className="govuk-hint">(optional)</span>
          </label>
          <textarea
            className="govuk-textarea"
            id="description"
            rows={3}
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="govuk-form-group">
          <label className="govuk-label" htmlFor="due_date">
            Due date and time
          </label>
          <input
            className="govuk-input"
            id="due_date"
            type="datetime-local"
            value={form.due_date}
            onChange={e => setForm({ ...form, due_date: e.target.value })}
            required
          />
        </div>

        <div className="govuk-button-group">
          <button
            type="submit"
            className="govuk-button"
            disabled={submitting}
          >
            {submitting ? 'Creating...' : 'Create Task'}
          </button>

          <button
            type="button"
            className="govuk-button govuk-button--secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}