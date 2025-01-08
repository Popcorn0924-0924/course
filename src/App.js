import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext } from "react"; // 引入 createContext
import InputComponent from "./input/InputComponent";
import ButtonComponent from "./input/ButtonComponent";
import TableComponent from "./input/TableComponent";
import { appStore } from "./input/AppStore"; // 引入 appStore

// 創建 Context 來提供 MobX store
export const AppStoreContext = createContext();

function App() {
  return (
    <AppStoreContext.Provider value={appStore}>
      <Router>
        <Routes>
          <Route path="/InputComponent" element={<InputComponent />} />
          <Route path="/ButtonComponent" element={<ButtonComponent />} />
          <Route path="/TableComponent" element={<TableComponent />} />
        </Routes>
      </Router>
    </AppStoreContext.Provider>
  );
}

export default App;
