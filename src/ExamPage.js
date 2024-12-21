import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ExamPage.css";

// 模擬數據
const mockQuestions = [
  { id: 1, question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
  { id: 2, question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
];

const ExamPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes for example
  const [submitted, setSubmitted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOptionClick = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setShowSuccessModal(true); // Show success modal
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate("/member"); // Redirect to MemberPage after closing modal
  };

  const getCompletionPercentage = () => {
    const answeredQuestions = Object.keys(answers).length;
    return (answeredQuestions / mockQuestions.length) * 100;
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
            <div style={{ width: `${getCompletionPercentage()}%` }}></div>
          </div>
          <button className="submit-btn" onClick={handleSubmit}>Submit</button>
        </div>
      ) : (
        <div className="result">
          <h2>Your Score: {Object.keys(answers).length} / {mockQuestions.length}</h2>
        </div>
      )}
      {showSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Congratulations! You have completed the exam.</h3>
            <button onClick={handleCloseModal}>Go Back</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamPage;
