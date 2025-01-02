// store/examStore.js
import { makeAutoObservable } from "mobx";

class ExamStore {
  examId = null; // 當前選中的考試 ID
  students = []; // 學生列表與成績
  average = 0; // 平均分數
  chartData = {}; // 圖表數據
  studentDetails = null; // 單個學生詳情

  constructor() {
    makeAutoObservable(this);
  }

  // 假資料模擬
  mockStudentData = {
    java: {
      students: [
        { id: "1", name: "Alice", score: 85 },
        { id: "2", name: "Bob", score: 78 },
        { id: "3", name: "Charlie", score: 92 },
      ],
      average: 85,
      chartData: { correct: 50, incorrect: 10 },
    },
    python: {
      students: [
        { id: "4", name: "David", score: 88 },
        { id: "5", name: "Eva", score: 95 },
        { id: "6", name: "Frank", score: 76 },
      ],
      average: 86,
      chartData: { correct: 60, incorrect: 8 },
    },
  };

  mockDetailsData = {
    "1": { answerStatus: "10 correct, 2 incorrect", score: 85 },
    "2": { answerStatus: "8 correct, 4 incorrect", score: 78 },
    "3": { answerStatus: "12 correct, 0 incorrect", score: 92 },
  };

  // 設定當前考試 ID 並載入學生列表
  setExamId(id) {
    this.examId = id;
    const data = this.mockStudentData[id];
    if (data) {
      this.students = data.students;
      this.average = data.average;
      this.chartData = data.chartData;
    }
  }

  // 載入特定學生詳情
  fetchStudentDetails(studentId) {
    this.studentDetails = this.mockDetailsData[studentId] || null;
  }
}

const examStore = new ExamStore();
export default examStore;
