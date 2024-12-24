import React from "react";

const ScoreCard = ({ score, totalQuestions }) => {
  return (
    <div className="score-card">
      <h2>Your Score</h2>
      <p>{`You got ${score} out of ${totalQuestions} correct.`}</p>
    </div>
  );
};

export default ScoreCard;
