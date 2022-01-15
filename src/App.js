import { useState } from 'react';
import './App.css';
import Carousel from './components/Carousel';

function App() {

  const [c1, setC1] = useState(1)

  return (
    <div className="App">
      <Carousel val={ c1 } setVal={ setC1 }/>
    </div>
  );
}

export default App;
