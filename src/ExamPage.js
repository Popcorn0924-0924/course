import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal } from 'rsuite';
import "./ExamPage.css";

// Mock exam data
const mockQuestions = [
  { id: 1, question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
  { id: 2, question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
];

const ExamPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(JSON.parse(localStorage.getItem('examAnswers')) || {});
  const [timeLeft, setTimeLeft] = useState(5); // 3 minutes in seconds
  const [submitted, setSubmitted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showTimeOutModal, setShowTimeOutModal] = useState(false);

  // Timer that decreases every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer); // Stop the timer when it reaches 0
          handleSubmit(); // Auto-submit the exam when time is up
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer
  }, []);

  // Handle selecting an option for a question
  const handleOptionClick = (questionId, option) => {
    const updatedAnswers = { ...answers, [questionId]: option };
    setAnswers(updatedAnswers);
    localStorage.setItem('examAnswers', JSON.stringify(updatedAnswers)); // Save to localStorage
  };

  // Handle form submission (either manually or auto-submit when time is up)
  const handleSubmit = () => {
    if (Object.keys(answers).length === mockQuestions.length) {
      setSubmitted(true);

      // Get correct answers and calculate score
      let score = 0;
      let incorrectQuestions = [];

      mockQuestions.forEach((question) => {
        if (answers[question.id] === question.answer) {
          score++;
        } else {
          incorrectQuestions.push(question);
        }
      });

      // Save score and incorrect answers to localStorage
      localStorage.setItem('examScore', score);
      localStorage.setItem('incorrectQuestions', JSON.stringify(incorrectQuestions));

      setShowSuccessModal(true); // Show success modal after submission
    } else {
      alert("Please complete all the questions before submitting!"); // Show alert if not all questions are answered
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/member"); // Redirect to MemberPage after closing success modal
  };

  return (
    <div className="exam-page">
      <h1>Exam: {id === "1" ? "Math Exam" : "Geography Exam"}</h1>
      <div className="timer">
        Time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
      </div>
      {!submitted ? (
        <div className="question-container">
          {mockQuestions.map((question) => (
            <div key={question.id} className="question">
              <h3>{question.question}</h3>
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(question.id, option)}
                  className={answers[question.id] === option ? "selected" : ""}
                >
                  {option}
                </button>
              ))}
            </div>
          ))}
          <div className="progress-bar">
            <div style={{ width: `${(Object.keys(answers).length / mockQuestions.length) * 100}%` }}></div>
          </div>
          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      ) : (
        <div className="result">
          <h2>Your Score: {localStorage.getItem('examScore')} / {mockQuestions.length}</h2>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Congratulations! You have completed the exam.</h3>
            <h4>Your Score: {localStorage.getItem('examScore')} / {mockQuestions.length}</h4>
            <h5>Incorrect Questions:</h5>
            <ul>
              {JSON.parse(localStorage.getItem('incorrectQuestions') || '[]').map((question, index) => (
                <li key={index}>
                  <p><strong>Question:</strong> {question.question}</p>
                  <p><strong>Your Answer:</strong> {answers[question.id]}</p>
                  <p><strong>Correct Answer:</strong> {question.answer}</p>
                </li>
              ))}
            </ul>
            <button onClick={handleCloseSuccessModal}>Go Back</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamPage;
