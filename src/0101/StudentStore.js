// 0101/StudentStore.js
import { createContext } from "react";
import { makeAutoObservable } from "mobx";

class StudentStore {
  exams = [
    { id: 1, name: "Java Exam", status: "pending" },
    { id: 2, name: "Math Exam", status: "pending" },
    { id: 3, name: "English Exam", status: "completed" },

  ];
  completedExams = [
    { id: 3, name: "English Exam", status: "completed" },
  ];
  currentExam = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchTodoExams() {
    console.log("Fetching Todo Exams...");
    return this.exams.filter(exam=>exam.status === "pending");
  }

  fetchCompletedExams() {
    console.log("Fetching Completed Exams...");
    return this.exams.filter(exam=>exam.status === "completed");
  }

  updateExamStatus(examId, status) {
    console.log(`Updating exam ${examId} status to ${status}...`);
    const exam = this.exams.find((exam) => exam.id === examId);
    if (exam) {
      exam.status = status;
      this.completedExams.push(exam);
      this.exams = this.exams.filter((exam) => exam.id !== examId);
    }
    console.log("Updated Data:", this.exams, this.completedExams);
  }

  setCurrentExam(exam) {
    this.currentExam = exam;
    console.log("Current Exam:", exam);
  }
}

// 這裡導出 studentStore 實例
export const studentStore = new StudentStore();
export const StudentContext = createContext(studentStore); // MobX Store Context
