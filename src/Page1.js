// Page1.js
import React from "react";
import { observer } from "mobx-react";
import studentStore from "./studentStore";
import { useNavigate } from "react-router-dom";

const Page1 = observer(() => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Page 1: Update Score</h1>
      <p>Current Score: {studentStore.score}</p>
      <button onClick={() => studentStore.incrementScore()}>Add Score</button>
      <button onClick={() => navigate("/page2")}>Go to Page 2</button>
    </div>
  );
});

export default Page1;
