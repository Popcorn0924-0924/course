// studentStore.js
import { makeAutoObservable } from "mobx";

class StudentStore {
  score = 0; // 初始分數

  constructor() {
    makeAutoObservable(this);
  }

  // 更新分數
  incrementScore() {
    this.score += 1;
  }
}

const studentStore = new StudentStore();
export default studentStore;
