import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import EditTaskModal from './EditTaskModal';
import ConfirmModal from './ConfirmModal';

function TaskItem({ task }) {
  const {
    deleteTask,
    toggleTask,
  } = useTasks();

  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] =
    useState(false);

  const priority = task.priority || 'Medium';
  const category = task.category || 'Study';

  const formattedDate = task.dueDate
    ? new Date(
        `${task.dueDate}T00:00:00`
      ).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : null;

  const isOverdue =
    task.dueDate &&
    !task.completed &&
    new Date(
      `${task.dueDate}T23:59:59`
    ) < new Date();

  return (
    <>
      <article
        className={`task-card ${
          task.completed
            ? 'task-completed'
            : ''
        }`}
      >
        <div className="task-main">
          <button
            className={`complete-button ${
              task.completed
                ? 'checked'
                : ''
            }`}
            onClick={() =>
              toggleTask(task.id)
            }
            aria-label="Toggle task completion"
          >
            {task.completed ? '✓' : ''}
          </button>

          <div className="task-content">
            <h3>{task.title}</h3>

            <div className="task-meta">
              <span
                className={`category-badge category-${category.toLowerCase()}`}
              >
                {category}
              </span>

              <span
                className={`priority-badge priority-${priority.toLowerCase()}`}
              >
                {priority}
              </span>

              {formattedDate && (
                <span
                  className={`date-badge ${
                    isOverdue
                      ? 'overdue'
                      : ''
                  }`}
                >
                  📅 {formattedDate}

                  {isOverdue && (
                    <small> Overdue</small>
                  )}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="task-actions">
          <button
            className="action-button edit-button"
            onClick={() =>
              setShowEdit(true)
            }
          >
            Edit
          </button>

          <button
            className="action-button delete-button"
            onClick={() =>
              setShowDeleteConfirm(true)
            }
          >
            Delete
          </button>
        </div>
      </article>

      {showEdit && (
        <EditTaskModal
          task={task}
          onClose={() =>
            setShowEdit(false)
          }
        />
      )}

      {showDeleteConfirm && (
        <ConfirmModal
          title="Delete Task?"
          message={`Are you sure you want to delete "${task.title}"?`}
          confirmText="Delete Task"
          onConfirm={() =>
            deleteTask(task.id)
          }
          onClose={() =>
            setShowDeleteConfirm(false)
          }
        />
      )}
    </>
  );
}

export default TaskItem;