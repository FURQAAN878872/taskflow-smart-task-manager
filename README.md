# TaskFlow — Smart Task Manager

A modern and responsive task management application built with **React.js**. TaskFlow helps users create, organize, track, and manage daily tasks through a clean and intuitive dashboard.

## 🚀 Live Demo

**[Live Demo](https://taskflow-smarttaskmanager.netlify.app/)**

## ✨ Features

* 📊 **Dashboard Overview**

  * Total tasks
  * In-progress tasks
  * Completed tasks
  * High-priority tasks

* ➕ **Create Tasks**

  * Add new tasks
  * Set task priority
  * Set due dates

* ✅ **Task Completion**

  * Mark tasks as completed
  * Completed tasks are visually distinguished

* ✏️ **Edit Tasks**

  * Update task title
  * Change priority
  * Change due date

* 🗑️ **Delete Tasks**

  * Delete individual tasks
  * Confirmation modal before deletion

* 🔍 **Search Tasks**

  * Search tasks by title in real time

* 🎯 **Task Filtering**

  * All
  * In Progress
  * Completed
  * High Priority

* 📅 **Due Date Tracking**

  * Display task due dates
  * Automatically identify overdue tasks

* 🌙 **Dark Mode**

  * Switch between light and dark themes

* 💾 **Local Storage**

  * Tasks remain saved after refreshing the browser

* 📱 **Responsive Design**

  * Works across desktop, tablet, and mobile screen sizes

* 🧭 **Multi-page Navigation**

  * Dashboard
  * All Tasks
  * Completed
  * Settings

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript (ES6+)
* React Router
* HTML5
* CSS3

### Concepts & APIs

* React Hooks
* Context API
* useMemo
* useState
* useEffect
* Browser Local Storage
* Responsive CSS
* Component-based architecture

### Development Tools

* Vite
* npm
* Git
* GitHub
* VS Code

## 📂 Project Structure

```text
src/
├── components/
│   ├── ConfirmModal.jsx
│   ├── EditTaskModal.jsx
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   ├── TaskForm.jsx
│   ├── TaskItem.jsx
│   └── TaskList.jsx
│
├── context/
│   └── TaskContext.jsx
│
├── pages/
│   ├── AllTasksPage.jsx
│   ├── CompletedPage.jsx
│   ├── DashboardPage.jsx
│   └── SettingsPage.jsx
│
├── App.jsx
├── App.css
└── main.jsx
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/FURQAAN878872/taskflow-smart-task-manager.git
```

### 2. Navigate to the project

```bash
cd taskflow-smart-task-manager
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local development URL provided by Vite.

## 🧠 What I Learned

While building TaskFlow, I practiced and implemented:

* Building reusable React components
* Managing shared application state with Context API
* Creating routes using React Router
* Handling forms and controlled inputs
* Implementing CRUD operations
* Working with browser Local Storage
* Building reusable modal components
* Filtering and searching data efficiently
* Managing derived data using `useMemo`
* Implementing light/dark themes
* Creating responsive layouts with CSS
* Structuring a React application for scalability

## 🔮 Future Improvements

TaskFlow is actively being developed. Planned improvements include:

* 🔐 User authentication
* ☁️ Cloud database integration
* 🤖 AI-powered task suggestions
* 📈 Productivity analytics
* 📊 Task completion charts
* 🔔 Task reminders and notifications
* 🏷️ Custom task categories and tags
* 📆 Calendar integration
* 👥 Collaborative task management

## 👨‍💻 Author

**Furqaan Khan**

Frontend Developer | React.js | JavaScript

## 📄 License

This project is currently created for learning, portfolio, and educational purposes.
