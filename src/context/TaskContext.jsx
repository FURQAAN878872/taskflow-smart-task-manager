import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';

const TaskContext = createContext();

function getInitialTasks() {
  const savedTasks = localStorage.getItem(
    'taskflow-tasks'
  );

  if (!savedTasks) {
    return [];
  }

  try {
    return JSON.parse(savedTasks);
  } catch {
    localStorage.removeItem('taskflow-tasks');
    return [];
  }
}

function getInitialDarkMode() {
  return (
    localStorage.getItem(
      'taskflow-dark-mode'
    ) === 'true'
  );
}

const initialState = {
  tasks: getInitialTasks(),
  darkMode: getInitialDarkMode(),
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          action.payload,
        ],
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(
          task =>
            task.id !== action.payload
        ),
      };

    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? {
                ...task,
                completed:
                  !task.completed,
              }
            : task
        ),
      };

    case 'EDIT_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? {
                ...task,
                ...action.payload.updates,
              }
            : task
        ),
      };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        tasks: state.tasks.filter(
          task => !task.completed
        ),
      };

    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        darkMode: !state.darkMode,
      };

    case 'CLEAR_ALL_TASKS':
      return {
        ...state,
        tasks: [],
      };

    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    localStorage.setItem(
      'taskflow-tasks',
      JSON.stringify(state.tasks)
    );
  }, [state.tasks]);

  useEffect(() => {
    localStorage.setItem(
      'taskflow-dark-mode',
      state.darkMode
    );

    document.body.classList.toggle(
      'dark-theme',
      state.darkMode
    );
  }, [state.darkMode]);

  const addTask = task => {
    dispatch({
      type: 'ADD_TASK',
      payload: task,
    });
  };

  const deleteTask = id => {
    dispatch({
      type: 'DELETE_TASK',
      payload: id,
    });
  };

  const toggleTask = id => {
    dispatch({
      type: 'TOGGLE_TASK',
      payload: id,
    });
  };

  const editTask = (id, updates) => {
    dispatch({
      type: 'EDIT_TASK',
      payload: {
        id,
        updates,
      },
    });
  };

  const clearCompleted = () => {
    dispatch({
      type: 'CLEAR_COMPLETED',
    });
  };

  const clearAllTasks = () => {
    dispatch({
      type: 'CLEAR_ALL_TASKS',
    });
  };

  const toggleDarkMode = () => {
    dispatch({
      type: 'TOGGLE_DARK_MODE',
    });
  };

  const value = {
    tasks: state.tasks,
    darkMode: state.darkMode,
    addTask,
    deleteTask,
    toggleTask,
    editTask,
    clearCompleted,
    clearAllTasks,
    toggleDarkMode,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error(
      'useTasks must be used inside TaskProvider'
    );
  }

  return context;
}