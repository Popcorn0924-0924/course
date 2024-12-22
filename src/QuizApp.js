import React, { useState, useEffect } from "react";
import "./QuizApp.css"; // 引入外部樣式文件

// 問題數據
const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Paris", "Berlin", "Madrid", "Rome"],
    answer: "Paris",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    id: 3,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
];

// 隨機化數據
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const QuizApp = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // 初始化題目和選項
    const shuffled = shuffleArray(
      questions.map((q) => ({
        ...q,
        options: shuffleArray(q.options),
      }))
    );
    setShuffledQuestions(shuffled);
  }, []);

  const handleOptionClick = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const getScore = () => {
    return shuffledQuestions.reduce((score, question) => {
      if (answers[question.id] === question.answer) score++;
      return score;
    }, 0);
  };

  return (
    <div className="quiz-container">
      <h1 className="quiz-courseName">Quiz App</h1>
      {!submitted ? (
        <>
          {/* 題目列表 */}
          {shuffledQuestions.map((question, index) => (
            <div
              key={question.id}
              className={`quiz-card ${
                answers[question.id] ? "answered" : ""
              }`}
            >
              <h3>
                {index + 1}. {question.question}
              </h3>
              <div className="options-container">
                {question.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleOptionClick(question.id, option)}
                    className={`option-button ${
                      answers[question.id] === option ? "selected" : ""
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* 提交按鈕 */}
          <button onClick={handleSubmit} className="submit-button">
            Submit
          </button>
        </>
      ) : (
        <>
          {/* 結果頁面 */}
          <h2 className="quiz-courseName">Results</h2>
          <p className="quiz-score">
            Your score: {getScore()} / {shuffledQuestions.length}
          </p>
          {shuffledQuestions.map((question, index) => (
            <div key={question.id} className="quiz-card result-card">
              <h3>
                {index + 1}. {question.question}
              </h3>
              <p>
                Your answer:{" "}
                <span
                  className={
                    answers[question.id] === question.answer
                      ? "correct-answer"
                      : "wrong-answer"
                  }
                >
                  {answers[question.id] || "No answer"}
                </span>
              </p>
              <p>
                Correct answer: <span className="correct-answer">{question.answer}</span>
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default QuizApp;
