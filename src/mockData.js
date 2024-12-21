// mockData.js

// 模擬考試資料
export const mockExams = [
  {
    title: "Math Exam",
    questions: [
      {
        question: "What is 2 + 2?",
        options: ["2", "3", "4", "5"],
        correctAnswer: "4",
      },
      {
        question: "What is 3 + 5?",
        options: ["5", "8", "9", "6"],
        correctAnswer: "8",
      },
    ],
  },
];

// 模擬學生資料
export const mockStudents = [
    { name: 'Student 1', title: "CICD", rank: 1, score: 80, incorrectQuestions: ['Q2', 'Q3'], preTestScore: 70, postTestScore: 80, answers: [{ question: "What is 2+2?", answer: "4", correctAnswer: "4" }, { question: "What is the capital of France?", answer: "Paris", correctAnswer: "Paris" }] },
    { name: 'Student 2', title: "CICD", rank: 2, score: 75, incorrectQuestions: ['Q1', 'Q4'], preTestScore: 60, postTestScore: 75, answers: [{ question: "What is 2+2?", answer: "5", correctAnswer: "4" }, { question: "What is the capital of France?", answer: "Berlin", correctAnswer: "Paris" }] },
    { name: 'Student 3', title: "CICD", rank: 3, score: 65, incorrectQuestions: ['Q2'], preTestScore: 60, postTestScore: 65, answers: [{ question: "What is 2+2?", answer: "4", correctAnswer: "4" }, { question: "What is the capital of France?", answer: "Paris", correctAnswer: "Paris" }] },
    { name: 'Student 4', title: "CICD2", rank: 1, score: 90, incorrectQuestions: ['Q1'], preTestScore: 85, postTestScore: 90, answers: [{ question: "What is 2+2?", answer: "4", correctAnswer: "4" }, { question: "What is the capital of France?", answer: "Berlin", correctAnswer: "Paris" }] }
  ]; 
