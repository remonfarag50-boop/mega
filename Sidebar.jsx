import React from 'react';

const Sidebar = () => {
  const menuItems = [
    { icon: '📝', text: 'Sales Reports', active: true },
    { icon: '📊', text: 'Dashboard' },
    { icon: '👥', text: 'Customers' },
    { icon: '💰', text: 'Payments' },
    { icon: '⚙️', text: 'Settings' },
    { icon: '📦', text: 'GitHub Repository' }
  ];

  return (
    <aside className="w-64 bg-white shadow-sm hidden md:block">
      <div className="h-full px-3 py-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={`flex items-center p-3 text-base font-normal rounded-lg hover:bg-gray-100 ${
                  item.active ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
              >
                <span className="w-6 h-6 text-center">{item.icon}</span>
                <span className="ml-3">{item.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;