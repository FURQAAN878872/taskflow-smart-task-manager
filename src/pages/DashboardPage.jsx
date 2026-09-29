import { useMemo, useState } from 'react';
import { useTasks } from '../context/TaskContext';

import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

function DashboardPage() {
  const { tasks } = useTasks();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // -----------------------------
  // BASIC STATISTICS
  // -----------------------------

  const completedTasks = tasks.filter(task => task.completed).length;

  const inProgressTasks = tasks.filter(task => !task.completed).length;

  const highPriorityTasks = tasks.filter(
    task => task.priority === 'High' && !task.completed
  ).length;

  const overdueTasks = tasks.filter(task => {
    if (!task.dueDate || task.completed) return false;

    return new Date(`${task.dueDate}T23:59:59`) < new Date();
  }).length;

  // -----------------------------
  // COMPLETION PROGRESS
  // -----------------------------

  const completionPercentage =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks / tasks.length) * 100);

  // -----------------------------
  // CATEGORY STATISTICS
  // -----------------------------

  const categories = ['Study', 'Work', 'Personal', 'Shopping'];

  const categoryStats = categories.map(category => ({
    name: category,
    count: tasks.filter(
      task => (task.category || 'Study') === category
    ).length,
  }));

  // -----------------------------
  // PRIORITY STATISTICS
  // -----------------------------

  const priorities = ['High', 'Medium', 'Low'];

  const priorityStats = priorities.map(priority => ({
    name: priority,
    count: tasks.filter(task => task.priority === priority).length,
  }));

  // -----------------------------
  // FILTERED TASKS
  // -----------------------------

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (filter === 'Completed') {
      result = result.filter(task => task.completed);
    }

    if (filter === 'In Progress') {
      result = result.filter(task => !task.completed);
    }

    if (filter === 'High Priority') {
      result = result.filter(
        task => task.priority === 'High' && !task.completed
      );
    }

    if (categoryFilter !== 'All') {
      result = result.filter(
        task => (task.category || 'Study') === categoryFilter
      );
    }

    if (search.trim()) {
      result = result.filter(task =>
        task.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    return result;
  }, [tasks, search, filter, categoryFilter]);

  return (
    <main className="dashboard">
      {/* ---------------- HEADER ---------------- */}

      <div className="dashboard-header">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <h1>Dashboard</h1>
          <p>Manage your tasks and stay productive every day.</p>
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

      {/* ---------------- STATS ---------------- */}

      <div className="stats">
        <div className="stat-card">
          <div className="stat-icon total-icon">☷</div>

          <div>
            <span>Total Tasks</span>
            <strong>{tasks.length}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon progress-icon">◔</div>

          <div>
            <span>In Progress</span>
            <strong>{inProgressTasks}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon completed-icon">✓</div>

          <div>
            <span>Completed</span>
            <strong>{completedTasks}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon priority-icon">!</div>

          <div>
            <span>High Priority</span>
            <strong>{highPriorityTasks}</strong>
          </div>
        </div>
      </div>

      {/* ---------------- ANALYTICS ---------------- */}

      <section className="analytics-grid">

        {/* Completion Progress */}

        <div className="analytics-card completion-card">
          <div className="analytics-card-header">
            <div>
              <p className="eyebrow">PROGRESS</p>
              <h2>Task Completion</h2>
            </div>

            <div className="completion-percentage">
              {completionPercentage}%
            </div>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>

          <div className="progress-info">
            <span>
              {completedTasks} of {tasks.length} tasks completed
            </span>

            <span>
              {inProgressTasks} remaining
            </span>
          </div>
        </div>

        {/* Category Analytics */}

        <div className="analytics-card">
          <div className="analytics-card-header">
            <div>
              <p className="eyebrow">CATEGORIES</p>
              <h2>Task Distribution</h2>
            </div>
          </div>

          <div className="analytics-list">
            {categoryStats.map(category => {
              const percentage =
                tasks.length === 0
                  ? 0
                  : Math.round((category.count / tasks.length) * 100);

              return (
                <div className="analytics-row" key={category.name}>
                  <div className="analytics-row-top">
                    <span>{category.name}</span>
                    <strong>{category.count}</strong>
                  </div>

                  <div className="mini-progress-track">
                    <div
                      className={`mini-progress-fill category-progress-${category.name.toLowerCase()}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priority Analytics */}

        <div className="analytics-card">
          <div className="analytics-card-header">
            <div>
              <p className="eyebrow">PRIORITY</p>
              <h2>Priority Breakdown</h2>
            </div>
          </div>

          <div className="priority-analytics">
            {priorityStats.map(priority => (
              <div
                className="priority-analytics-item"
                key={priority.name}
              >
                <span
                  className={`priority-dot priority-dot-${priority.name.toLowerCase()}`}
                ></span>

                <span>{priority.name}</span>

                <strong>{priority.count}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Overdue Analytics */}

        <div className="analytics-card overdue-analytics-card">
          <div className="analytics-card-header">
            <div>
              <p className="eyebrow">ATTENTION</p>
              <h2>Overdue Tasks</h2>
            </div>

            <div className="overdue-count">
              {overdueTasks}
            </div>
          </div>

          <p className="analytics-description">
            {overdueTasks === 0
              ? 'Great! You have no overdue tasks.'
              : `You have ${overdueTasks} ${
                  overdueTasks === 1 ? 'task' : 'tasks'
                } that need attention.`}
          </p>
        </div>

      </section>

      {/* ---------------- CREATE TASK ---------------- */}

      <TaskForm />

      {/* ---------------- TASK LIST ---------------- */}

      <section className="task-section">
        <div className="task-section-top">
          <div>
            <h2>My Tasks</h2>

            <p>
              {filteredTasks.length}{' '}
              {filteredTasks.length === 1 ? 'task' : 'tasks'} displayed
            </p>
          </div>

          <div className="task-controls">

            <div className="search-box">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <select
              value={filter}
              onChange={e => setFilter(e.target.value)}
            >
              <option>All</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>High Priority</option>
            </select>

            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
            >
              <option>All</option>
              <option>Study</option>
              <option>Work</option>
              <option>Personal</option>
              <option>Shopping</option>
            </select>

          </div>
        </div>

        <TaskList tasks={filteredTasks} />
      </section>
    </main>
  );
}

export default DashboardPage;