import React, { useContext } from "react";
import { AppStoreContext } from "../App"; // 引入 Context
import { observer } from "mobx-react-lite"; // 使用 observer
import { Link } from "react-router-dom"; // 引入 Link 來做頁面導航

const InputComponent = observer(() => {
  const store = useContext(AppStoreContext); // 使用 Context 獲取 store

  return (
    <div>
      <input
        type="text"
        value={store.inputText} // 綁定 store 中的 inputText
        onChange={(e) => store.updateInputText(e.target.value)} // 更新 store 中的 inputText
        placeholder="輸入文字"
      />
      <br />
      <Link to="/ButtonComponent">前往 Button 組件</Link>
      <br />
      <Link to="/TableComponent">前往 Table 組件</Link>
    </div>
  );
});

export default InputComponent;
