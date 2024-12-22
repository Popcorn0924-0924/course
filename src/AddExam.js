import React, { useState } from 'react';

function AddExam() {
  const [examcourseName, setExamcourseName] = useState('');
  const [questions, setQuestions] = useState([
    {
      question: '',
      options: ['', '', '', ''],
      correctAnswer: ''
    }
  ]);

  const handleExamcourseNameChange = (e) => {
    setExamcourseName(e.target.value);
  };

  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (index, optionIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctAnswer = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: ''
      }
    ]);
  };

  // 提交表單的處理函數
  const handleSubmit = async (e) => {
    e.preventDefault(); // 阻止表單默認提交
    const examData = { courseName: examcourseName, questions }; // 構建要發送的考試數據
    try {
      const response = await fetch('http://localhost:3000/api/exams', {
        method: 'POST', // 設置為 POST 請求
        headers: {
          'Content-Type': 'application/json', // 設置請求體為 JSON
        },
        body: JSON.stringify(examData), // 把 examData 轉換為 JSON 字符串並作為請求體
      });

      if (response.ok) {
        console.log('Exam created successfully!');
      } else {
        console.error('Failed to create exam');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Create New Exam</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Exam courseName:</label>
          <input
            type="text"
            value={examcourseName}
            onChange={handleExamcourseNameChange}
            placeholder="Enter exam courseName"
            required
          />
        </div>

        {questions.map((question, index) => (
          <div key={index}>
            <div>
              <label>Question {index + 1}:</label>
              <input
                type="text"
                value={question.question}
                onChange={(e) => handleQuestionChange(index, e)}
                placeholder="Enter the question"
                required
              />
            </div>

            <div>
              <label>Options:</label>
              {question.options.map((option, optionIndex) => (
                <input
                  key={optionIndex}
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, optionIndex, e)}
                  placeholder={`Option ${optionIndex + 1}`}
                  required
                />
              ))}
            </div>

            <div>
              <label>Correct Answer:</label>
              <input
                type="text"
                value={question.correctAnswer}
                onChange={(e) => handleCorrectAnswerChange(index, e)}
                placeholder="Enter the correct answer"
                required
              />
            </div>
          </div>
        ))}

        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>
        <button type="submit">Submit Exam</button>
      </form>
    </div>
  );
}

export default AddExam;
