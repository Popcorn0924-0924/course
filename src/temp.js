import React, { useState } from "react";
import "./LeaderDashboard.css";

// Mock data for students
const mockStudents = [
  {
    name: 'Student 1',
    
    courseName: "CICD",
    rank: 1,
    score: 80,
    incorrectQuestions: ['Q2', 'Q3'],
    preTestScore: 70,
    postTestScore: 80,
    answers: [
      { question: "What is 2+2?", answer: "4", correctAnswer: "4" },
      { question: "What is the capital of France?", answer: "Paris", correctAnswer: "Paris" }
    ]
  },
  {
    name: 'Student 2',
    courseName: "CICD",
    rank: 2,
    score: 75,
    incorrectQuestions: ['Q1', 'Q4'],
    preTestScore: 60,
    postTestScore: 75,
    answers: [
      { question: "What is 2+2?", answer: "5", correctAnswer: "4" },
      { question: "What is the capital of France?", answer: "Berlin", correctAnswer: "Paris" }
    ]
  }
  // Other students data...
];

const LeaderDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [examcourseName, setExamcourseName] = useState("");
  const [examType, setExamType] = useState("pre-test");
  const [questions, setQuestions] = useState([
    { question: "", type: "single", options: ["", "", "", ""], correctAnswer: "" }
  ]);
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedStudentForExam, setSelectedStudentForExam] = useState("all");
  const [showErrorForm, setShowErrorForm] = useState(false);
  const [incorrectAnswer, setIncorrectAnswer] = useState("");
  const [studentNameFilter, setStudentNameFilter] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]); // for multiple selection
  const [isValid, setIsValid] = useState(true); // to track form validity
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

  // Function to handle radio button change for single selection
  const handleRadioChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  // Function to handle checkbox change for multiple selection
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedOptions((prevOptions) => [...prevOptions, value]);
    } else {
      setSelectedOptions((prevOptions) =>
        prevOptions.filter((option) => option !== value)
      );
    }
  };
  // Function to handle question option change
  const handleOptionChange = (index, optionIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = e.target.value;
    setQuestions(updatedQuestions);
  };
  
  // Function to handle question type change
  const handleTypeChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = e.target.value;
    setQuestions(updatedQuestions);
  };

  // Function to handle answer selection
  const handleSetAsAnswer = (index, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctAnswer = updatedQuestions[index].options[optionIndex];
    setQuestions(updatedQuestions);
  };

  // Function to handle question change
  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = e.target.value;
    setQuestions(updatedQuestions);
  };

  // Submit the new exam

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedOptions.length < 2 || !selectedAnswer) {
      setIsValid(false);
    } else {
      setIsValid(true);
      const newExam = { courseName: examcourseName, type: examType, questions };
      setShowModal(false);
      alert("Exam created successfully!");
    }
  };

  // Display selected student's incorrect answers
  const handleViewStudentAnswers = (student) => {
    setSelectedStudent(student);
  };

  // Filter students based on selected subject and student name
  const filteredStudents = mockStudents.filter(student =>
    (selectedSubject === "all" || student.courseName === selectedSubject) &&
    student.name.toLowerCase().includes(studentNameFilter.toLowerCase())
  );

  // Get the list of available subjects
  const subjects = Array.from(new Set(mockStudents.map(student => student.courseName)));
  const names = Array.from(new Set(mockStudents.map(student => student.name)));

  // Dynamic color based on score
  const getScoreColor = (score) => {
    if (score >= 85) return "green";
    if (score >= 70) return "yellow";
    return "red";
  };

  return (
    <div className="leader-dashboard">
      <h1>Leader Dashboard</h1>

      {/* Filter by Subject */}
      <div className="filters">
        <div className="filter-group">
          <h3>Filter by Subject</h3>
          <select onChange={(e) => setSelectedSubject(e.target.value)} value={selectedSubject}>
            <option value="all">All Subjects</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        
        {/* Filter by Student Name */}
        <div className="filter-group">
          <h3>Filter by Student Name</h3>
          <input
            type="text"
            placeholder="Enter student name"
            value={studentNameFilter}
            onChange={(e) => setStudentNameFilter(e.target.value)}
          />
          <select onChange={(e) => setSelectedStudent(e.target.value)} value={selectedStudent}>
            <option value="all"></option>
            {names.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Display Existing Exams */}
      <div className="exam-selection">
        <button onClick={() => setShowModal(true)} className="create-exam-btn">Create New Exam</button>
      </div>

      {/* Display Students and Their Scores */}
      <div className="student-list">
        <h2>Student Scores</h2>
        {filteredStudents.map((student, index) => (
          <div
            key={index}
            className="student-card"
            style={{ borderColor: getScoreColor(student.score) }}
            onClick={() => handleViewStudentAnswers(student)}
          >
            <h3>{student.name} (Subject: {student.courseName}) (Rank: {student.rank})</h3>
            <p>Score: {student.score}</p>
            <p>Pre-Test Score: {student.preTestScore}</p>
            <p>Post-Test Score: {student.postTestScore}</p>
            <p>Incorrect Questions: {student.incorrectQuestions.join(', ')}</p>
            <button onClick={() => { setShowErrorForm(true); setIncorrectAnswer(student.incorrectQuestions[0]); }}>
              View Incorrect Question
            </button>
          </div>
        ))}
      </div>

      {/* Display Incorrect Answers */}
      {selectedStudent && showErrorForm && (
        <div className="modal-overlay">
          <form className="error-form">
            <h3>{selectedStudent.name}'s Incorrect Answers</h3>
            <ul>
              {selectedStudent.answers.map((answer, index) => {
                if (answer.answer !== answer.correctAnswer) {
                  return (
                    <li key={index}>
                      <strong>{answer.question}</strong>
                      <p>Your Answer: {answer.answer}</p>
                      <p>Correct Answer: {answer.correctAnswer}</p>
                    </li>
                  );
                }
                return null;
              })}
            </ul>
            <button className="close-btn" onClick={() => setShowErrorForm(false)}>Close</button>
          </form>
        </div>
      )}

      {/* New Exam Form */}
      {showModal && (
        <div className="modal-overlay">
          <form onSubmit={handleSubmit} className="exam-form">
            <h3>Create New Exam</h3>
            <label>Exam courseName:</label>
            <input
              type="text"
              value={examcourseName}
              onChange={(e) => setExamcourseName(e.target.value)}
              required
            />
            <label>Exam Type:</label>
            <select onChange={(e) => setExamType(e.target.value)} value={examType} required>
              <option value="pre-test">Pre-Test</option>
              <option value="post-test">Post-Test</option>
            </select>

                       {/* Question and Answer Options */}
                       {questions.map((question, index) => (
              <div key={index}>
                <label>Question {index + 1}:</label>
                <input
                  type="text"
                  value={question.question}
                  onChange={(e) => handleRadioChange(e)}
                  required
                />
                <label>Type:</label>
                <select onChange={(e) => handleRadioChange(e)} value={question.type}>
                  <option value="single">Single Choice</option>
                  <option value="multi">Multiple Choice</option>
                </select>

                {/* Display Options */}
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="input-group">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleCheckboxChange(e)}
                      required
                    />
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <input
                        type="checkbox"
                        checked={question.correctAnswer === option}
                        onChange={() => setSelectedAnswer(option)}
                      />
                      <label>Set as Answer</label>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            <button type="submit">Submit Exam</button>
            <button className="close-btn" onClick={() => setShowModal(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LeaderDashboard;