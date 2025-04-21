import React from 'react';
import TemplateSection from './TemplateSection';

const AllSubCategories = ({ subCategories }) => {
  return (
    <div className="all-subcategories">
      {subCategories.map((subCat) => (
        <TemplateSection key={subCat.slug} subCategory={subCat} />
      ))}
    </div>
  );
};

export default AllSubCategories;
