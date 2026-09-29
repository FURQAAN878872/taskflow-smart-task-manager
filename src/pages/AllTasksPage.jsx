import { useMemo, useState } from 'react';
import { useTasks } from '../context/TaskContext';

import TaskList from '../components/TaskList';

function AllTasksPage() {
  const { tasks } = useTasks();

  const [search, setSearch] =
    useState('');

  const [filter, setFilter] =
    useState('All');

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
          task.priority === 'High'
      );
    }

    if (search.trim()) {
      result = result.filter(task =>
        task.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );
    }

    return result;
  }, [tasks, search, filter]);

  return (
    <main className="dashboard">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">
            WORKSPACE
          </p>

          <h1>All Tasks</h1>

          <p>
            View and manage every task in
            your workspace.
          </p>
        </div>
      </div>

      <section className="task-section">
        <div className="task-section-top">
          <div>
            <h2>Task List</h2>

            <p>
              {filteredTasks.length}{' '}
              tasks displayed
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
                  setSearch(
                    e.target.value
                  )
                }
              />
            </div>

            <select
              value={filter}
              onChange={e =>
                setFilter(
                  e.target.value
                )
              }
            >
              <option>All</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>High Priority</option>
            </select>
          </div>
        </div>

        <TaskList
          tasks={filteredTasks}
        />
      </section>
    </main>
  );
}

export default AllTasksPage;