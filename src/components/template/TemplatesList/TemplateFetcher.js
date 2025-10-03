import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../server/firebase';
import AllSubCategories from './AllCategories';

const TemplateFetcher = ({ onTotalCount }) => {
  const [groupedTemplates, setGroupedTemplates] = useState(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'templates'));
        const templates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // ✅ Send total count back up to parent
        if (onTotalCount) {
          onTotalCount(templates.length);
        }

        // Group by subCategory
        const grouped = templates.reduce((acc, template) => {
          const subCategory = template.subCategory || 'Other';
          if (!acc[subCategory]) acc[subCategory] = [];
          acc[subCategory].push(template);
          return acc;
        }, {});

        const groupedArray = Object.keys(grouped).map(subCategory => ({
          name: subCategory,
          slug: subCategory.toLowerCase().replace(/\s+/g, '-'),
          templates: grouped[subCategory],
        }));

        setGroupedTemplates(groupedArray);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, [onTotalCount]);

  if (!groupedTemplates) return <p>Loading templates...</p>;

  return <AllSubCategories subCategories={groupedTemplates} />;
};

export default TemplateFetcher;
