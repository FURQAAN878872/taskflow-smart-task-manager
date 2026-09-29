import { useMemo, useState } from 'react';
import { useTasks } from '../context/TaskContext';

import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

function DashboardPage() {
  const { tasks } = useTasks();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const completedTasks = tasks.filter(
    task => task.completed
  ).length;

  const inProgressTasks = tasks.length - completedTasks;

  const highPriorityTasks = tasks.filter(
    task =>
      task.priority === 'High' &&
      !task.completed
  ).length;

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (filter === 'Completed') {
      result = result.filter(
        task => task.completed
      );
    }

    if (filter === 'In Progress') {
      result = result.filter(
        task => !task.completed
      );
    }

    if (filter === 'High Priority') {
      result = result.filter(
        task =>
          task.priority === 'High' &&
          !task.completed
      );
    }

    if (search.trim()) {
      result = result.filter(task =>
        task.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    return result;
  }, [tasks, search, filter]);

  return (
    <main className="dashboard">

      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">OVERVIEW</p>

          <h1>Dashboard</h1>

          <p>
            Manage your tasks and stay productive every day.
          </p>
        </div>

        <div className="today-badge">
          <span>Today</span>

          <strong>
            {new Date().toLocaleDateString('en-IN', {
              day: '2-digit',
              month: 'short',
            })}
          </strong>
        </div>
      </div>

      {/* Statistics */}
      <div className="stats">

        <div className="stat-card">
          <div className="stat-icon total-icon">
            ☷
          </div>

          <div>
            <span>Total Tasks</span>
            <strong>{tasks.length}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon progress-icon">
            ◔
          </div>

          <div>
            <span>In Progress</span>
            <strong>{inProgressTasks}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon completed-icon">
            ✓
          </div>

          <div>
            <span>Completed</span>
            <strong>{completedTasks}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon priority-icon">
            !
          </div>

          <div>
            <span>High Priority</span>
            <strong>{highPriorityTasks}</strong>
          </div>
        </div>

      </div>

      {/* Create Task */}
      <TaskForm />

      {/* Task List */}
      <section className="task-section">

        <div className="task-section-top">

          <div>
            <h2>My Tasks</h2>

            <p>
              {filteredTasks.length}{' '}
              {filteredTasks.length === 1
                ? 'task'
                : 'tasks'}{' '}
              displayed
            </p>
          </div>

          <div className="task-controls">

            <div className="search-box">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={e =>
                  setSearch(e.target.value)
                }
              />

            </div>

            <select
              value={filter}
              onChange={e =>
                setFilter(e.target.value)
              }
            >
              <option>All</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>High Priority</option>
            </select>

          </div>

        </div>

        <TaskList tasks={filteredTasks} />

      </section>

    </main>
  );
}

export default DashboardPage;