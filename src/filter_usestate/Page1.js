import React, { useState, useEffect } from 'react';

const Page1 = ({ filter, setFilter }) => {  const [students] = useState([
    { name: 'David', score: 70 },
    { name: 'Eva', score: 80 },
    { name: 'Frank', score: 50 },
  ]);
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [averageScore, setAverageScore] = useState(0);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  useEffect(() => {
    const filtered = students.filter(
      (student) => student.score >= filter.min && student.score <= filter.max
    );
    setFilteredStudents(filtered);

    if (filtered.length === 0) {
      setAverageScore(0);
    } else {
      const total = filtered.reduce((sum, student) => sum + student.score, 0);
      setAverageScore(total / filtered.length);
    }
  }, [filter, students]);

  return (
    <div>
      <h2>頁面 1 - 學生篩選</h2>
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
        {filteredStudents.map((student) => (
          <li key={student.name}>
            {student.name}: {student.score}
          </li>
        ))}
      </ul>

      <h3>平均分數: {averageScore}</h3>
    </div>
  );
};

export default Page1;
