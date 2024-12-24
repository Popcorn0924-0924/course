import React from "react";
import "./ErrorQuestions.css";

const mockData = [
  {
    question: "What is 2 + 2?",
    options: ["4", "6", "7", "8"],
    userAnswers: ["6", "4"],
    correctAnswers: ["4"],
  },
  {
    question: "Which are primary colors?",
    options: ["Red", "Green", "Blue", "Yellow"],
    userAnswers: ["Green", "Red"],
    correctAnswers: ["Red", "Blue", "Yellow"],
  },
  {
    question: "Which are primary colors?",
    options: ["Red", "Green", "Blue", "Yellow"],
    userAnswers: ["Green", "Red"],
    correctAnswers: ["Green", "Red"],
  },
];

// 計算分數的函數
const calculateScore = (data) => {
  let correctCount = 0;
  data.forEach((questionData) => {
    questionData.options.forEach((option) => {
      const isUserAnswer = questionData.userAnswers.includes(option);
      const isAnswer = questionData.correctAnswers.includes(option);
      if (isUserAnswer && isAnswer) {
        correctCount += 1;
      }
    });
  });
  return correctCount;
};

const ErrorQuestions = () => {
  const score = calculateScore(mockData);
  const totalQuestions = mockData.length;

  return (
    <div className="error-questions-container">
      {/* 顯示成績卡 */}
      <div className="score-card">
        <h2>Your Score</h2>
        <p>{`You got ${score} out of ${totalQuestions} correct.`}</p>
      </div>

      {/* 顯示錯誤問題 */}
      <div className="questions-card">
        {mockData.map((questionData, index) => (
          <div key={index} className="question-row">
            <div className="question-content">
              <h3 className="question-title">
                {`Q${index + 1}: ${questionData.question}`}
                {/* 顯示對錯的標籤 */}
                <span className={`status-icon ${questionData.userAnswers.length === questionData.correctAnswers.length && questionData.userAnswers.every((ans) => questionData.correctAnswers.includes(ans)) ? 'correct' : 'incorrect'}`}>
                  {questionData.userAnswers.length === questionData.correctAnswers.length && questionData.userAnswers.every((ans) => questionData.correctAnswers.includes(ans)) ? '✔ CORRECT' : '✘ WRONG'}
                </span>
              </h3>
              <ul className="options-list">
                {questionData.options.map((option, idx) => {
                  const isUserAnswer = questionData.userAnswers.includes(option);
                  const isAnswer = questionData.correctAnswers.includes(option);
                  const isCorrect = isUserAnswer && isAnswer;
                  const isIncorrect =
                    (isUserAnswer && !isAnswer) || (!isUserAnswer && isAnswer);

                  return (
                    <li
                      key={idx}
                      className={`option ${isCorrect ? "correct" : ""} ${isIncorrect ? "incorrect" : ""}`}
                    >
                      {/* 圓圈 (灰色) */}
                      <span className={`circle ${isUserAnswer ? "circle-gray" : ""}`} />
                      <div className="option-container">
                        {/* 打勾或打叉 */}
                        {isCorrect && (
                          <span className="icon correct-icon">✓</span> // 顯示正確答案打勾
                        )}
                        {isIncorrect && (
                          <span className="icon incorrect-icon">✗</span> // 顯示錯誤答案打叉
                        )}

                        {/* Option text */}
                        <span className="option-text">{option}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="correct-answer-card">
                <h4>Correct Answer</h4>
                <ul>
                  {questionData.correctAnswers.map((answer, idx) => (
                    <li key={idx} className="correct-option">
                      {answer}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ErrorQuestions;
