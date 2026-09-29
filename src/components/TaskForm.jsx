import { useState } from 'react';
import { useTasks } from '../context/TaskContext';

function TaskForm() {
  const { addTask } = useTasks();

  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('Study');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      priority,
      category,
      dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    addTask(newTask);

    setTitle('');
    setPriority('Medium');
    setCategory('Study');
    setDueDate('');
  };

  return (
    <section className="task-section create-section">
      <div className="section-heading">
        <div>
          <h2>Create New Task</h2>
          <p>Add a task and keep your work organized.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="task-form">
        <div className="input-group task-title-input">
          <label>Task Title</label>

          <input
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Category</label>

          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
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
            onChange={e => setPriority(e.target.value)}
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
            onChange={e => setDueDate(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="add-task-button"
        >
          <span>+</span>
          Add Task
        </button>
      </form>
    </section>
  );
}

export default TaskForm;