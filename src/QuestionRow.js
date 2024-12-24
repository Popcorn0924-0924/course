import React from "react";

const QuestionRow = ({ questionData, index }) => {
  return (
    <div className="question-row">
      <div className="question-content">
        <h3 className="question-title">
          {`Q${index + 1}: ${questionData.question}`}
          {/* 顯示對錯的標籤 */}
          <span
            className={`status-icon ${
              questionData.userAnswers.length === questionData.correctAnswers.length &&
              questionData.userAnswers.every((ans) =>
                questionData.correctAnswers.includes(ans)
              )
                ? "correct"
                : "incorrect"
            }`}
          >
            {questionData.userAnswers.length === questionData.correctAnswers.length &&
            questionData.userAnswers.every((ans) => questionData.correctAnswers.includes(ans))
              ? "✔ CORRECT"
              : "✘ WRONG"}
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
                  {isCorrect && <span className="icon correct-icon">✓</span>}
                  {isIncorrect && <span className="icon incorrect-icon">✗</span>}

                  {/* Option text */}
                  <span className="option-text">{option}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default QuestionRow;
