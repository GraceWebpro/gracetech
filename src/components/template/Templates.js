import React, { useState, useEffect } from 'react';
import { db } from '../../server/firebase'; // Your Firebase setup
import { collection, getDocs } from 'firebase/firestore';
import TemplateCard from './TemplateCard'; // Your TemplateCard component

const TemplateTabs = () => {
  const [templates, setTemplates] = useState([]);
  const [activeTab, setActiveTab] = useState('all'); // Tracks the current active tab

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const templatesData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTemplates(templatesData);
      } catch (error) {
        console.error("Error fetching templates: ", error);
      }
    };

    fetchTemplates();
  }, []);

  // Filter templates based on the selected tab
  const filteredTemplates = templates.filter((template) => {
    if (activeTab === 'all') return true;
    return template.category === activeTab;
  });

  return (
    <div className="template-tabs-container" id='templates'>
      {/* Tab Navigation */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Templates
        </button>
        <button 
          className={`tab ${activeTab === 'ui' ? 'active' : ''}`}
          onClick={() => setActiveTab('ui')}
        >
          UI Templates
        </button>
        <button 
          className={`tab ${activeTab === 'ui-ux' ? 'active' : ''}`}
          onClick={() => setActiveTab('ui-ux')}
        >
          UI/UX Templates
        </button>
      </div>

      {/* Display Templates */}
      <div className="template-list">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map(template => (
            <TemplateCard key={template.id} {...template} />
          ))
        ) : (
          <p>No templates found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default TemplateTabs;
