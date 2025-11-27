import React from 'react';
import { NavLink } from 'react-router-dom';

interface Tab {
  id: string;
  label: string;
  path: string;
}

interface TabNavigationProps {
  tabs: Tab[];
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex -mb-px space-x-8 overflow-x-auto px-4">
        {tabs.map((tab) => (
          <NavLink
            key={tab.id}
            to={tab.path}
            className={({ isActive }) =>
              `whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                isActive
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;