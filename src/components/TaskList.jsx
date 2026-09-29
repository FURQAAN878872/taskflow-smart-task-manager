import TaskItem from './TaskItem';

function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          ✓
        </div>

        <h3>No tasks found</h3>

        <p>
          Create a task or change your filters
          to see results here.
        </p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
        />
      ))}
    </div>
  );
}

export default TaskList;