import React, { useState } from "react";

const CourseStructure = () => {
  const [sections, setSections] = useState([
    { title: "", lectures: [{ title: "", description: "" }] },
  ]);

  const handleSectionChange = (index, value) => {
    const updated = [...sections];
    updated[index].title = value;
    setSections(updated);
  };

  const handleLectureChange = (sectionIndex, lectureIndex, field, value) => {
    const updated = [...sections];
    updated[sectionIndex].lectures[lectureIndex][field] = value;
    setSections(updated);
  };

  const addSection = () => {
    setSections([...sections, { title: "", lectures: [{ title: "", description: "" }] }]);
  };

  const addLecture = (sectionIndex) => {
    const updated = [...sections];
    updated[sectionIndex].lectures.push({ title: "", description: "" });
    setSections(updated);
  };

  const removeSection = (index) => {
    const updated = sections.filter((_, i) => i !== index);
    setSections(updated);
  };

  const removeLecture = (sectionIndex, lectureIndex) => {
    const updated = [...sections];
    updated[sectionIndex].lectures = updated[sectionIndex].lectures.filter(
      (_, i) => i !== lectureIndex
    );
    setSections(updated);
  };

  const handleSave = () => {
    console.log("Saving course structure:", sections);
    // Here you can later add Firestore upload logic
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Course Structure</h2>
      <p className="text-gray-600 mb-6">
        Organize your course into sections and lectures. Each section should cover a major topic area.
      </p>

      {sections.map((section, sIndex) => (
        <div key={sIndex} className="border rounded-lg p-4 mb-6 bg-gray-50">
          <div className="flex justify-between items-center mb-3">
            <input
              type="text"
              placeholder={`Section ${sIndex + 1} Title`}
              value={section.title}
              onChange={(e) => handleSectionChange(sIndex, e.target.value)}
              className="flex-1 border rounded p-2 mr-2"
            />
            {sections.length > 1 && (
              <button
                onClick={() => removeSection(sIndex)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            )}
          </div>

          <div className="ml-4">
            {section.lectures.map((lecture, lIndex) => (
              <div key={lIndex} className="border-l-4 border-indigo-400 pl-3 mb-4">
                <h4 className="font-semibold mb-1">
                  Lecture {lIndex + 1}
                </h4>
                <input
                  type="text"
                  placeholder="Lecture Title"
                  value={lecture.title}
                  onChange={(e) =>
                    handleLectureChange(sIndex, lIndex, "title", e.target.value)
                  }
                  className="w-full border rounded p-2 mb-2"
                />
                <textarea
                  placeholder="Lecture Description"
                  value={lecture.description}
                  onChange={(e) =>
                    handleLectureChange(sIndex, lIndex, "description", e.target.value)
                  }
                  className="w-full border rounded p-2 mb-2"
                  rows="2"
                />
                {section.lectures.length > 1 && (
                  <button
                    onClick={() => removeLecture(sIndex, lIndex)}
                    className="bg-red-400 text-white text-sm px-3 py-1 rounded"
                  >
                    Remove Lecture
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addLecture(sIndex)}
              className="mt-2 text-indigo-600 font-medium"
            >
              + Add Lecture
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center">
        <button
          onClick={addSection}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          + Add Section
        </button>
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default CourseStructure;
