import { makeAutoObservable } from 'mobx';

export const appStore = makeAutoObservable({
    inputText: '',  // 儲存 Input 中的文字
    tableData: [],  // 儲存 Table 的資料

    // 更新 inputText
    updateInputText(newText) {
        this.inputText = newText;
    },

    // 新增資料到 table
    addToTable() {
        if (this.inputText.trim()) {
            this.tableData.push(this.inputText);
            this.inputText = ''; // 清空 Input
        }
    },

    // 更新 Table 中特定的資料
    updateTableText(index, newText) {
        if (this.tableData[index]) {
            this.tableData[index] = newText;
        }
    }
});
