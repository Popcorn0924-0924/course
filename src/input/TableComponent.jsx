import React, { useContext } from "react";
import { AppStoreContext } from "../App"; // 引入 Context
import { observer } from "mobx-react-lite"; // 使用 observer
import { Link } from "react-router-dom"; // 引入 Link 來做頁面導航

const TableComponent = observer(() => {
  const store = useContext(AppStoreContext); // 使用 Context 獲取 store

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>資料</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {store.tableData.map((data, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={data}
                  onChange={(e) => store.updateTableText(index, e.target.value)} // 更新 table 資料
                />
              </td>
              <td>
                <button onClick={() => alert(`你選中了: ${data}`)}>顯示資料</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <Link to="/InputComponent">返回 Input 組件</Link>
      <br />
      <Link to="/ButtonComponent">返回 Button 組件</Link>
    </div>
  );
});

export default TableComponent;
