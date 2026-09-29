import { useTasks } from '../context/TaskContext';

function Header() {
  const { tasks } = useTasks();

  const completedTasks = tasks.filter(
    task => task.completed
  ).length;

  return (
    <header className="header">
      <div className="brand">
        <div className="brand-icon">T</div>

        <div>
          <h1>TaskFlow</h1>
          <p>Smart Task Management</p>
        </div>
      </div>

      <div className="header-right">
        <div className="header-progress">
          <span>
            {completedTasks} completed
          </span>
        </div>

        <div className="header-user">
          <div className="user-avatar">F</div>

          <div className="user-info">
            <strong>Furqaan</strong>
            <span>Productive Day</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;