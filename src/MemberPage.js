import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MemberPage.css";

const mockSubjects = [
  { id: 1, title: "Math Exam - Pre-Test", type: "pre-test", status: "not_started" },
  { id: 2, title: "Math Exam - Post-Test", type: "post-test", status: "not_started" },
  { id: 3, title: "Geography Exam - Pre-Test", type: "pre-test", status: "completed" },
  { id: 4, title: "Geography Exam - Post-Test", type: "post-test", status: "not_started" },
];

const MemberPage = () => {
  const [subjects, setSubjects] = useState(mockSubjects);
  const [filterType, setFilterType] = useState("all"); // 篩選條件
  const navigate = useNavigate();

  const handleSelectSubject = (subject) => {
    if (subject.status === "completed") {
      alert(`${subject.title} has already been completed!`);
    } else if (subject.status === "not_started") {
      navigate(`/exam/${subject.id}`);
    } else {
      alert(`${subject.title} is in progress!`);
    }
  };

  const filteredSubjects =
    filterType === "all"
      ? subjects
      : subjects.filter((subject) => subject.type === filterType);

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
        {filteredSubjects.map((subject) => (
          <li key={subject.id} className="subject-card">
            <h3>{subject.title}</h3>
            <p>Status: {subject.status}</p>
            <button
              className="select-btn"
              onClick={() => handleSelectSubject(subject)}
              disabled={subject.status === "completed"}
            >
              {subject.status === "completed" ? "Completed" : "Start Exam"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberPage;
