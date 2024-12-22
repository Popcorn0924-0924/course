import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MemberPage.css";

const mockSubjects = [
  { id: 1, courseName: "Math Exam", type: "pre-test", status: "not_started" },
  { id: 2, courseName: "Math Exam", type: "post-test", status: "not_started" },
  { id: 3, courseName: "Geography Exam", type: "pre-test", status: "completed" },
  { id: 4, courseName: "Geography Exam", type: "post-test", status: "not_started" },
];
const groupSubjectsByCourseName = (subjects) => {
  const grouped = {};
  subjects.forEach((subject) => {
    if (!grouped[subject.courseName]){
      grouped[subject.courseName] = [];
    }
    grouped[subject.courseName].push(subject);
    
  });
  return grouped;
};
const MemberPage = () => {
  const [subjects, setSubjects] = useState(mockSubjects);
  const [filterType, setFilterType] = useState("all"); // 篩選條件
  const navigate = useNavigate();

  const handleSelectSubject = (subject) => {
    if (subject.status === "completed") {
      alert(`${subject.courseName} has already been completed!`);
    } else if (subject.status === "not_started") {
      navigate(`/exam/${subject.id}`);
    } else {
      alert(`${subject.courseName} is in progress!`);
    }
  };
  const groupedSubjects = groupSubjectsByCourseName(subjects);
  const filteredSubjects =
    filterType === "all"
      ? groupedSubjects
      : Object.fromEntries(
          Object.entries(groupedSubjects).map(([title, exams]) => [
            title,
            exams.filter((exam) => exam.type === filterType),
          ])
        );
        console.log(filteredSubjects);
        return (
          <div className="member-dashboard">
            <h1>Welcome to the Member Page</h1>
            <div className="filter-section">
              <label>Filter by Exam Type:</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All</option>
                <option value="pre-test">Pre-Test</option>
                <option value="post-test">Post-Test</option>
              </select>
            </div>
            <h2>Select Your Exam</h2>
            <ul className="subject-list">
              
              {Object.entries(filteredSubjects).map(([courseName, exams]) => (
                <li key={courseName} className="subject-card">
                  <h3>{courseName}</h3>
                  <div className="exam-card">
                    {exams.map((exam) => (
                      <div key={exam.id} className="exam-item">
                        <p>{exam.type}</p>
                        <p>Status: {exam.status}</p>
                        <button
                          className={`select-btn ${
                            exam.status === "completed" ? "completed" : "btn-active"
                          }`}
                          onClick={() => handleSelectSubject(exam)}
                          disabled={exam.status === "completed"}
                        >
                          {exam.status === "completed" ? "Completed" : "Start Exam"}
                        </button>
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
  );
};

export default MemberPage;
