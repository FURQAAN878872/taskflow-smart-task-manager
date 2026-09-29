import { useEffect, useState } from 'react';
import { useTasks } from '../context/TaskContext';

function EditTaskModal({ task, onClose }) {
  const { editTask } = useTasks();

  const [title, setTitle] = useState(task.title);
  const [category, setCategory] = useState(
    task.category || 'Study'
  );
  const [priority, setPriority] = useState(
    task.priority || 'Medium'
  );
  const [dueDate, setDueDate] = useState(
    task.dueDate || ''
  );

  useEffect(() => {
    setTitle(task.title);
    setCategory(task.category || 'Study');
    setPriority(task.priority || 'Medium');
    setDueDate(task.dueDate || '');
  }, [task]);

  const handleSubmit = e => {
    e.preventDefault();

    if (!title.trim()) return;

    editTask(task.id, {
      title: title.trim(),
      category,
      priority,
      dueDate,
    });

    onClose();
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={onClose}
    >
      <div
        className="modal"
        onMouseDown={e =>
          e.stopPropagation()
        }
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">TASK</p>
            <h2>Edit Task</h2>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Task Title</label>

            <input
              autoFocus
              value={title}
              onChange={e =>
                setTitle(e.target.value)
              }
            />
          </div>

          <div className="modal-form-grid">
            <div className="input-group">
              <label>Category</label>

              <select
                value={category}
                onChange={e =>
                  setCategory(e.target.value)
                }
              >
                <option>Study</option>
                <option>Work</option>
                <option>Personal</option>
                <option>Shopping</option>
              </select>
            </div>

            <div className="input-group">
              <label>Priority</label>

              <select
                value={priority}
                onChange={e =>
                  setPriority(e.target.value)
                }
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="input-group">
              <label>Due Date</label>

              <input
                type="date"
                value={dueDate}
                onChange={e =>
                  setDueDate(e.target.value)
                }
              />
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-button"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTaskModal;