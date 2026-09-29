import { useTasks } from '../context/TaskContext';
import TaskList from '../components/TaskList';

function CompletedPage() {
  const { tasks, clearCompleted } = useTasks();

  const completedTasks = tasks.filter(
    task => task.completed
  );

  return (
    <main className="dashboard">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">PROGRESS</p>

          <h1>Completed Tasks</h1>

          <p>
            Review everything you have
            successfully completed.
          </p>
        </div>

        {completedTasks.length > 0 && (
          <button
            className="clear-button"
            onClick={clearCompleted}
          >
            Clear Completed
          </button>
        )}
      </div>

      <section className="task-section">
        <div className="task-section-top">
          <div>
            <h2>Completed</h2>

            <p>
              {completedTasks.length}{' '}
              completed{' '}
              {completedTasks.length === 1
                ? 'task'
                : 'tasks'}
            </p>
          </div>
        </div>

        <TaskList tasks={completedTasks} />
      </section>
    </main>
  );
}

export default CompletedPage;