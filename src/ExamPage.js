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
  const [answers, setAnswers] = useState({});
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

  // Warn user when they try to leave the page without completing the exam
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!submitted && Object.keys(answers).length < mockQuestions.length) {
        const message =
          "You haven't completed the exam. If you exit, you will lose your exam eligibility. Please contact your class leader.";

        // For modern browsers
        event.returnValue = message;
        return message; // Required for some older browsers (like IE)
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [answers, submitted]);

  // Handle selecting an option for a question
  const handleOptionClick = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  // Handle form submission (either manually or auto-submit when time is up)
  const handleSubmit = () => {
    if (Object.keys(answers).length === mockQuestions.length) {
      setSubmitted(true);
      setShowSuccessModal(true); // Show success modal after submission
    } else {

      alert("Please complete all the questions before submitting!"); // Show alert if not all questions are answered
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/member"); // Redirect to MemberPage after closing success modal
  };

  // Show a time-out modal when time runs out
  useEffect(() => {
    if (timeLeft === 0 && !submitted) {
      setShowTimeOutModal(true); // Show the "Time's up" modal
    }
  }, [timeLeft, submitted]);

  const handleCloseTimeOutModal = () => {
    setShowTimeOutModal(false);
    navigate("/member"); // Redirect to MemberPage after closing time-out modal
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
          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      ) : (
        <div className="result">
          <h2>Your Score: {Object.keys(answers).length} / {mockQuestions.length}</h2>
        </div>
      )}

      {/* Success Modal (for manual submit or time-out) */}
      {showSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Congratulations! You have completed the exam.</h3>
            {timeLeft === 0 && <p>Time's up! Your exam has been automatically submitted.</p>}
            <button onClick={handleCloseSuccessModal}>Go Back</button>
          </div>
        </div>
      )}


      {/* Time-Out Modal (shows when time is up) */}
      {
        showTimeOutModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Time's up!</h3>
              <p>Your exam has been automatically submitted due to time expiration.</p>
              <button onClick={handleCloseTimeOutModal}>Go Back</button>
            </div>
          </div>
        )
      }
    </div >
    
  );
};


export default ExamPage;
