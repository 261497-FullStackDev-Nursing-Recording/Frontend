import "./formlayout.css";
import React, { useState } from 'react';

type Tab = {
  label: string;
  content: React.ReactNode;
};

interface TabViewProps {
  tabs: Tab[];
}

const TabView: React.FC<TabViewProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="tab-view">
      <ul className="tab-header">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={`tab-item ${index === activeTab ? 'active' : ''}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
      <div className="tab-content">{tabs[activeTab].content}</div>
    </div>
  );
};

export default TabView;