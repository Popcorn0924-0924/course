import { autorun } from 'mobx';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import studentStore from './filter/filteredStudentstore';

let averageRenderCount = 0; // 用來計算平均分數渲染次數

// 使用 autorun 來監控 `averageScore` 變化
autorun(() => {
  averageRenderCount += 1;
  console.log(`Average score rendered ${averageRenderCount} times`);
});

const App = observer(() => {
  const [filter, setFilter] = useState({ min: 0, max: 100 });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  useEffect(() => {
    // 設定篩選條件，這會觸發 store 中的 applyFilter 函數
    studentStore.setFilter(filter);
  }, [filter]);

  return (
    <div>
      <h2>學生篩選</h2>
      <label>
        最小分數:
        <input
          type="number"
          name="min"
          value={filter.min}
          onChange={handleFilterChange}
        />
      </label>
      <label>
        最大分數:
        <input
          type="number"
          name="max"
          value={filter.max}
          onChange={handleFilterChange}
        />
      </label>

      <h3>篩選結果:</h3>
      <ul>
        {studentStore.filteredStudents.map((student) => (
          <li key={student.name}>
            {student.name}: {student.score}
          </li>
        ))}
      </ul>

      <h3>平均分數: {studentStore.averageScore}</h3>
    </div>
  );
});

export default App;
