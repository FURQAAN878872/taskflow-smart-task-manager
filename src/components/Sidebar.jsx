import { NavLink } from 'react-router-dom';

function Sidebar() {
  const menuItems = [
    {
      name: 'Dashboard',
      path: '/',
      icon: '▦',
    },
    {
      name: 'All Tasks',
      path: '/tasks',
      icon: '☷',
    },
    {
      name: 'Completed',
      path: '/completed',
      icon: '✓',
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: '⚙',
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-menu">
        <p className="menu-label">MENU</p>

        {menuItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-item ${
                isActive ? 'active' : ''
              }`
            }
          >
            <span className="sidebar-icon">
              {item.icon}
            </span>

            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>

      <div className="sidebar-bottom">
        <div className="productivity-card">
          <div className="productivity-icon">
            ⚡
          </div>

          <strong>Stay Productive</strong>

          <p>
            Complete your tasks and keep moving
            forward.
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;