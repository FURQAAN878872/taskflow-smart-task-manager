import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { TaskProvider } from './context/TaskContext';

import Header from './components/Header';
import Sidebar from './components/Sidebar';

import DashboardPage from './pages/DashboardPage';
import AllTasksPage from './pages/AllTasksPage';
import CompletedPage from './pages/CompletedPage';
import SettingsPage from './pages/SettingsPage';

import './App.css';

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <div className="app">
          <Header />

          <div className="layout">
            <Sidebar />

            <Routes>
              <Route
                path="/"
                element={<DashboardPage />}
              />

              <Route
                path="/tasks"
                element={<AllTasksPage />}
              />

              <Route
                path="/completed"
                element={<CompletedPage />}
              />

              <Route
                path="/settings"
                element={<SettingsPage />}
              />

              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </TaskProvider>
  );
}

export default App;