import React, { useState } from "react";
import "./LeaderDashboard.css";
import Select from "react-select";

// Mock data for students
const mockStudents = [
  {
    name: 'Student 1',
    employmentId:"159144",
    title: "CICD",
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
    employmentId:"159145",
    title: "CICD",
    rank: 2,
    score: 75,
    incorrectQuestions: ['Q1', 'Q4'],
    preTestScore: 60,
    postTestScore: 75,
    answers: [
      { question: "What is 2+2?", answer: "5", correctAnswer: "4" },
      { question: "What is the capital of France?", answer: "Berlin", correctAnswer: "Paris" }
    ]
  },
  {
    name: 'Student 2',
    employmentId:"1591",
    title: "CICD2",
    rank: 2,
    score: 75,
    incorrectQuestions: ['Q3', 'Q4'],
    preTestScore: 65,
    postTestScore: 75,
    answers: [
      { question: "What is 2+2?", answer: "5", correctAnswer: "4" },
      { question: "What is the capital of France?", answer: "Berlin", correctAnswer: "Paris" }
    ]
  }
];

const LeaderDashboard = () => {
  const [showExamModal, setExamShowModal] = useState(false); // 控制新考試表單是否顯示
  const [examTitle, setExamTitle] = useState("");
  const [examType, setExamType] = useState("pre-test");
  const [questions, setQuestions] = useState([
    { question: "", type: "single", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correctAnswer: [] }
  ]);
  // 用來檢查表單是否有效，防止錯誤提交。
  const [isValid, setIsValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState("all");
  const [studentNameFilter, setStudentNameFilter] = useState("all");
  const [duplicateOptions, setDuplicateOptions] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null); // 新增狀態來保存選擇的學生
  const [showErrorForm, setShowErrorForm] = useState(false);
  const [incorrectAnswer, setIncorrectAnswer] = useState("");



  const handleCheckboxChange = (index, e) => {
    const { value, checked } = e.target;
    const updatedQuestions = [...questions];

    if (updatedQuestions[index].type === "single") {
      // For single-choice questions, only one option can be selected
      updatedQuestions[index].correctAnswer = [value];
    } else {
      if (checked) {
        updatedQuestions[index].correctAnswer.push(value);
        //選項被取消勾選
      } else {
        updatedQuestions[index].correctAnswer = updatedQuestions[index].correctAnswer.filter(
          (option) => option !== value
        );
      }
    }

    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (index, optionIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = e.target.value;
    setQuestions(updatedQuestions);
    checkForDuplicates(updatedQuestions);
  };

  const handleTypeChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = e.target.value;
    updatedQuestions[index].correctAnswer = [];
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = e.target.value;
    setQuestions(updatedQuestions);
  };

  const checkForDuplicates = (updatedQuestions) => {
    const options = updatedQuestions[0].options;
    const seen = new Set();
    const duplicates = options.filter(option => seen.size === seen.add(option).size);
    setDuplicateOptions(duplicates);
  };

  const handleAddQuestion = () => {
    const updatedQuestions = [...questions, { question: "", type: "single", options: ["Option 1", "Option 2", "Option 3", "Option 4"], correctAnswer: [] }];
    setQuestions(updatedQuestions);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedQuestions = [...questions];
    const currentQuestion = updatedQuestions[0];

    if (currentQuestion.type === "single" && currentQuestion.correctAnswer.length !== 1) {
      setIsValid(false);
      setValidationMessage("單選題必須選擇一個正確答案");
    } else if (currentQuestion.type === "multi" && currentQuestion.correctAnswer.length < 2) {
      setIsValid(false);
      setValidationMessage("多選題必須選擇至少兩個選項作為答案");
    } else {
      setIsValid(true);
      setValidationMessage("");
      const newExam = { title: examTitle, type: examType, questions };
      setExamShowModal(false);
      alert("考試已成功建立！");
    }
  };

  const handleViewStudentAnswers = (student) => {
    setSelectedStudent(student); // 當點擊學生時，保存選擇的學生
  };

  const handleCloseStudentAnswers = () => {
    setSelectedStudent(null); // 關閉學生答題詳細信息
  };

  const filteredStudents = mockStudents.filter(student =>
    (selectedSubjectFilter === "all" || student.title === selectedSubjectFilter) &&
    (studentNameFilter === "all" || `${student.employmentId} ${student.name}` === studentNameFilter)
    // student.name.toLowerCase().includes(studentNameFilter.toLowerCase())
  );

  const subjects = Array.from(new Set(mockStudents.map(student => student.title)));
  const subjectOptions = [{ value: "all", label: "All Subjects" }, ...subjects.map(subject => ({
    value: subject,
    label: subject
  }))];


  const nameOptions = [
    { value: "all", label: "All Employees" },
    ...mockStudents.map(student => ({
      value: `${student.employmentId} ${student.name}`,
      label: `${student.employmentId} ${student.name}`
    }))
  ];

  const getScoreColor = (score) => {
    if (score >= 85) return "green";
    if (score >= 70) return "yellow";
    return "red";
  };
  

  return (
    <div className="leader-dashboard">
      <h1>Leader Dashboard</h1>

      {/* Create New Exam Button */}
      {!showExamModal && (
        <button onClick={() => setExamShowModal(true)}>Create New Exam</button>
      )}

      {/* Filter by Subject */}
      <div className="filters">
        <div className="filter-group">
          <h3>Filter by Subject</h3>
          <Select
          options={subjectOptions}
          value={subjectOptions.find(option => option.value === selectedSubjectFilter)} // 控制選中的值
          onChange={(selectedOption) =>
            setSelectedSubjectFilter(selectedOption ? selectedOption.value : "all") // 選擇時處理清除的情況
          }
          placeholder="Select or type to search..." // 提示文字
          isClearable // 允許清除選擇
        />
          
        </div>
        
        {/* Filter by Student Name */}
        <div className="filter-group-nameAndId">
          <h3>Filter by Student Name</h3>
          <Select
          options={nameOptions}
          value={nameOptions.find(option => option.value === studentNameFilter)} // 控制選中的值
          onChange={(selectedOption) =>
            setStudentNameFilter(selectedOption ? selectedOption.value : "all") // 選擇時處理清除的情況
          }          
          placeholder="Select or type to search..." // 提示文字
          isClearable // 允許清除選擇
        />
        </div>
      </div>

      {/* Display Students and Their Scores */}
      <div className="student-list">
        <h2>Student Scores</h2>
        {!showExamModal && filteredStudents.map((student, index)  => (
          <div
            key={index}
            className="student-card"
            style={{ borderColor: getScoreColor(student.score) }}
            onClick={() => handleViewStudentAnswers(student)}
          >
            <h3>{student.name} (Subject: {student.title}) (Rank: {student.rank})</h3>
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
      {showExamModal && (
        <div className="exam-form-modal">
          <form onSubmit={handleSubmit} className="exam-form">
            <h3>Create New Exam</h3>
            <label>Exam Title:</label>
            <input
              type="text"
              value={examTitle}
              onChange={(e) => setExamTitle(e.target.value)}
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
                  onChange={(e) => handleQuestionChange(index, e)}
                  required
                />
                <label>Type:</label>
                <select onChange={(e) => handleTypeChange(index, e)} value={question.type}>
                  <option value="single">Single Choice</option>
                  <option value="multi">Multiple Choice</option>
                </select>

                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="input-group">
                    <label>{`Option ${optionIndex + 1}:`}</label>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, optionIndex, e)}
                      required
                    />
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <input
                        type="checkbox"
                        value={option}
                        checked={question.correctAnswer.includes(option)}
                        onChange={(e) => handleCheckboxChange(index, e)}
                      />
                      <label>Set as Answer</label>
                    </div>
                  </div>
                ))}
                {duplicateOptions.length > 0 && (
                  <p className="error-message">Duplicate Options: {duplicateOptions.join(', ')}</p>
                )}

                <button type="button" onClick={() => handleRemoveQuestion(index)}>Remove Question</button>
              </div>
            ))}
            <button type="button" onClick={handleAddQuestion}>Add New Question</button>

            {!isValid && <p className="error-message">{validationMessage}</p>}
            <button type="submit" disabled={!questions.some(q => q.correctAnswer.length > 0)}>Submit Exam</button>
            <button className="close-btn" onClick={() => setExamShowModal(false)}>Cancel</button>
          </form>
        </div>
      )}

    </div>
    
  );
};

export default LeaderDashboard;
