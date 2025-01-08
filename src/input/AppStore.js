import { makeAutoObservable } from 'mobx';

class AppStore {
    inputText = '';  // 儲存 Input 中的文字
    tableData = [];  // 儲存 Table 的資料

    constructor() {
        makeAutoObservable(this); // 使這些屬性和方法成為 MobX 的 observable 和 action
    }

    // 更新 inputText
    updateInputText(newText) {
        this.inputText = newText;
    }

    // 新增資料到 table
    addToTable() {
        if (this.inputText.trim()) {
            this.tableData.push(this.inputText);
            this.inputText = ''; // 清空 Input
        }
    }

    // 更新 Table 中特定的資料
    updateTableText(index, newText) {
        if (this.tableData[index]) {
            this.tableData[index] = newText;
        }
    }
}

export const appStore = new AppStore();
