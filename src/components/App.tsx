import React, { useState } from 'react';
import './App.scss';

export const App = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);

  return (
    <div>
      <div>Hello World!</div>
      <h1>{count}</h1>
      <button onClick={decrement}>
        <span>dec</span>
      </button>
      <button onClick={increment}>inc</button>
    </div>
  );
};
