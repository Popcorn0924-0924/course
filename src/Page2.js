// Page2.js
import React from "react";
import { observer } from "mobx-react";
import studentStore from "./studentStore";
import { useNavigate } from "react-router-dom";

const Page2 = observer(() => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Page 2: View Score</h1>
      <p>Current Score: {studentStore.score}</p>
      <button onClick={() => navigate("/")}>Back to Page 1</button>
    </div>
  );
});

export default Page2;
