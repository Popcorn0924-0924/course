const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// 模擬數據庫
let exams = [];

// API 接口：接收新增的考試
app.post('/api/exams', (req, res) => {
  const newExam = req.body;
  exams.push(newExam);
  res.status(201).send('Exam Created');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
