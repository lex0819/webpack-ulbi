import React, { useState } from 'react';
import styles from './App.module.scss';

export const App = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);

  return (
    <div>
      <div>Hello World!</div>
      <h1>{count}</h1>
      <button className={styles.button} onClick={decrement}>
        <span>dec</span>
      </button>
      <button className={styles.button} onClick={increment}>
        <span>inc</span>
      </button>
    </div>
  );
};
