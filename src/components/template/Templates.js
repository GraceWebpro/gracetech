import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../server/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import TemplateCard from './TemplateCard';
import './Templates.css';
import Template from './Temp';

const tabs = [
  { label: 'All Templates', value: 'all' },
  { label: 'UI Templates', value: 'UI Design' },
  { label: 'UI/UX Templates', value: 'UI/UX Design' },
];

const TemplateTabs = () => {
  const [templates, setTemplates] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const indicatorRef = useRef(null);
  const tabRefs = useRef({});

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const q = query(collection(db, "projects"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);
        const projectList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTemplates(projectList);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }

    fetchTemplates();
  }, []);

  useEffect(() => {
    const currentTab = tabRefs.current[activeTab];
    const indicator = indicatorRef.current;
    if (currentTab && indicator) {
      const { offsetLeft, offsetWidth } = currentTab;
      indicator.style.left = `${offsetLeft}px`;
      indicator.style.width = `${offsetWidth}px`;
    }
  }, [activeTab]);

  const filteredTemplates = templates.filter((template) => {
    if (activeTab === 'all') return true;
    return template.category === activeTab;
  });

  return (
    <div className="template-tabs-container" id="templates">
      <div className="template-tabs-wrapper">
        <div className="template-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              className={`template-tab ${activeTab === tab.value ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.value)}
              ref={(el) => (tabRefs.current[tab.value] = el)}
            >
              {tab.label}
            </button>
          ))}
          <div className="tab-indicator" ref={indicatorRef}></div>
        </div>
      </div>

      <div className="template-list">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((template) => (
            <TemplateCard key={template.id} {...template} />
          ))
        ) : (
          <p>No templates found in this category.</p>
        )}
      </div>
      <Template />
    </div>
  );
};

export default TemplateTabs;
