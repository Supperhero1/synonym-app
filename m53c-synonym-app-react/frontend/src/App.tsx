import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import styles from './App.module.scss';

function App() {
  const [data, setData] = useState()
  useEffect(() => {
    const fetchData = async () => {

    }
  }, [])
  return (
    <div className={styles.App}>
      <h1>Synonym app</h1>
      <p></p>
    </div>
  );
}

export default App;
