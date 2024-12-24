import React from "react";

const CorrectAnswer = ({ correctAnswers }) => {
  return (
    <div className="correct-answer-card">
      <h4>Correct Answer</h4>
      <ul>
        {correctAnswers.map((answer, idx) => (
          <li key={idx} className="correct-option">
            {answer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CorrectAnswer;
