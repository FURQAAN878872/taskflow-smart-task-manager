import { useTasks } from '../context/TaskContext';

function SettingsPage() {
  const {
    tasks,
    darkMode,
    toggleDarkMode,
    clearAllTasks,
  } = useTasks();

  const completedTasks =
    tasks.filter(
      task => task.completed
    ).length;

  const handleClearAll = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete all tasks? This cannot be undone.'
    );

    if (confirmed) {
      clearAllTasks();
    }
  };

  return (
    <main className="dashboard">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">
            PREFERENCES
          </p>

          <h1>Settings</h1>

          <p>
            Manage your TaskFlow
            preferences.
          </p>
        </div>
      </div>

      <section className="settings-card">
        <div className="settings-row">
          <div>
            <h3>Appearance</h3>

            <p>
              Switch between light and dark
              mode.
            </p>
          </div>

          <button
            className={`theme-toggle ${
              darkMode ? 'enabled' : ''
            }`}
            onClick={toggleDarkMode}
          >
            <span>
              {darkMode
                ? 'Dark Mode'
                : 'Light Mode'}
            </span>

            <div className="toggle-circle">
              {darkMode ? '☾' : '☀'}
            </div>
          </button>
        </div>

        <div className="settings-row">
          <div>
            <h3>Local Storage</h3>

            <p>
              Your tasks are automatically
              saved in your browser.
            </p>
          </div>

          <span className="status-badge">
            Active
          </span>
        </div>

        <div className="settings-row">
          <div>
            <h3>Total Tasks</h3>

            <p>
              Number of tasks currently
              stored.
            </p>
          </div>

          <strong className="settings-value">
            {tasks.length}
          </strong>
        </div>

        <div className="settings-row">
          <div>
            <h3>Completed Tasks</h3>

            <p>
              Tasks that you have finished.
            </p>
          </div>

          <strong className="settings-value">
            {completedTasks}
          </strong>
        </div>

        <div className="settings-danger">
          <div>
            <h3>Clear All Tasks</h3>

            <p>
              Permanently remove all saved
              tasks.
            </p>
          </div>

          <button
            className="danger-button"
            onClick={handleClearAll}
          >
            Delete All
          </button>
        </div>
      </section>
    </main>
  );
}

export default SettingsPage;