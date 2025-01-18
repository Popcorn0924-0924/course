import React, { useState } from 'react';
import Page1 from './Page1';
import Page2 from './Page2';

const Parent = () => {
  const [filter, setFilter] = useState({ min: 0, max: 100 });

  return (
    <div>
      <h1>學生篩選範例</h1>
      <Page1 filter={filter} setFilter={setFilter} />
      <Page2 filter={filter} setFilter={setFilter} />
    </div>
  );
};

export default Parent;
