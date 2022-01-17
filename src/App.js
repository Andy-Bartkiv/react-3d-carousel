import { useState } from 'react';
import './App.css';
import Carousel from './components/Carousel';

function App() {

  const [car1, setCar1] = useState(1);
  const [car2, setCar2] = useState(1);

  return (
    <div className="App">
      <Carousel dig={ car1 } setDig={ setCar1 } cellCount={ 10 } size={ 50 } isHorizontal={ true }/>
      <Carousel dig={ car2 } setDig={ setCar2 } cellCount={ 10 } size={ 30 }/>
      <div>{ car1 } { car2 }</div>
    </div>
  );
}

export default App;
