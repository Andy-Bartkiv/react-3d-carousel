import { useState } from 'react';
import './App.css';
import Carousel from './components/Carousel';

function App() {

  const [car1, setCar1] = useState(5);
  const cellCnt = 10;

  return (
    <div className="App">
      <Carousel dig={ car1 } setDig={ setCar1 } cellCount={ cellCnt }/>
      <div>{ car1 }</div>
    </div>
  );
}

export default App;
