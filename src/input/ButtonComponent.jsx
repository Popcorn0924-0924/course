import React, { useContext } from "react";
import { AppStoreContext } from "../App"; // 引入 Context
import { observer } from "mobx-react-lite"; // 使用 observer
import { Link } from "react-router-dom"; // 引入 Link 來做頁面導航

const ButtonComponent = observer(() => {
  const store = useContext(AppStoreContext); // 使用 Context 獲取 store

  const handleClick = () => {
    store.addToTable(); // 觸發 store 的 addToTable 方法
  };

  return (
    <div>
      <button onClick={handleClick}>新增到 Table</button>
      <br />
      <Link to="/InputComponent">返回 Input 組件</Link>
      <br />
      <Link to="/TableComponent">前往 Table 組件</Link>
    </div>
  );
});

export default ButtonComponent;
