import { makeAutoObservable, reaction } from 'mobx';

class FilteredStudentStore {
  students = [
    { name: 'Alice', score: 60 },
    { name: 'Bob', score: 85 },
    { name: 'Charlie', score: 90 },
    // 其他學生資料...
  ];

  filterCriteria = { min: 0, max: 100 }; // 篩選條件，範圍 (預設為 0 - 100)
  filteredStudents = []; // 篩選後的學生列表
  cachedAverageScore = null; // 用來儲存上一次計算的平均分數

  constructor() {
    makeAutoObservable(this);

    // 監聽 filteredStudents，只有當它變化時才計算新的平均分數
    reaction(
      () => this.filteredStudents, // 監聽篩選後的學生資料
      () => {
        this.calculateAverageScore();
      }
    );
  }

  // 篩選學生資料
  setFilter(criteria) {
    this.filterCriteria = criteria;
    this.applyFilter();
  }

  // 根據篩選條件更新篩選後的學生列表
  applyFilter() {
    this.filteredStudents = this.students.filter(student =>
      student.score >= this.filterCriteria.min && student.score <= this.filterCriteria.max
    );
  }

  // 計算篩選結果的平均分數
  calculateAverageScore() {
    const filtered = this.filteredStudents;
    if (filtered.length === 0) return 0;

    const total = filtered.reduce((sum, student) => sum + student.score, 0);
    this.cachedAverageScore = total / filtered.length;
  }

  // 獲取篩選結果的平均分數
  get averageScore() {
    console.log(this.cachedAverageScore)
    return this.cachedAverageScore;
  }
}

const studentStore = new FilteredStudentStore();

// 篩選條件：80 - 100
studentStore.setFilter({ min: 80, max: 100 });
// 篩選條件：50 - 100
studentStore.setFilter({ min: 50, max: 100 });

export default studentStore;
