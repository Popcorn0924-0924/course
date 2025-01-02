// 0101/StudentStore.js
import { createContext } from "react";
import { makeAutoObservable } from "mobx";

class StudentStore {
  todoExams = [
    { id: 1, name: "Java Exam", status: "pending" },
    { id: 2, name: "Math Exam", status: "pending" },
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
    return this.todoExams;
  }

  fetchCompletedExams() {
    console.log("Fetching Completed Exams...");
    return this.completedExams;
  }

  updateExamStatus(examId, status) {
    console.log(`Updating exam ${examId} status to ${status}...`);
    const exam = this.todoExams.find((exam) => exam.id === examId);
    if (exam) {
      exam.status = status;
      this.completedExams.push(exam);
      this.todoExams = this.todoExams.filter((exam) => exam.id !== examId);
    }
    console.log("Updated Data:", this.todoExams, this.completedExams);
  }

  setCurrentExam(exam) {
    this.currentExam = exam;
    console.log("Current Exam:", exam);
  }
}

// 這裡導出 studentStore 實例
export const studentStore = new StudentStore();
export const StudentContext = createContext(studentStore); // MobX Store Context
