import React from 'react';
import { FaFemale, FaMale, FaDragon } from "react-icons/fa";

/**
 * CategoryTabs - Tab navigation component for categories
 * @param {string} activeTab - Currently active tab
 * @param {function} onTabChange - Callback when tab changes
 */
export function CategoryTabs({ activeTab = 'girls', onTabChange }) {
  const tabs = [
    { id: 'girls', label: 'Girls', icon: <FaFemale /> },
    { id: 'anime', label: 'Anime', icon: <FaDragon /> },
    { id: 'guys', label: 'Guys', icon: <FaMale /> },
  ];

  return (
    <div className="flex gap-2 p-1 rounded-xl bg-[var(--glass-bg)] border border-[var(--border-subtle)]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
            activeTab === tab.id
              ? 'bg-gradient-to-r from-[var(--accent-primary-glow)] to-transparent text-[var(--accent-primary)] border border-[var(--border-glow)]'
              : 'text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-card-hover)]'
          }`}
        >
          <span className={`text-lg ${activeTab === tab.id ? 'scale-110' : ''} transition-transform duration-300`}>
            {tab.icon}
          </span>
          <span className="font-medium">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;
