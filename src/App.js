import { useState, useLayoutEffect, useRef } from 'react';
import './App.css';
import Carousel from './components/Carousel';

function App() {
  const divRef = useRef();
  const [dimensions, setDimensions] = useState(null);
  useLayoutEffect(() => {
    if (divRef.current)
      setDimensions({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight,
        min: Math.min(divRef.current.offsetWidth, divRef.current.offsetHeight),
      });
  }, []);

  const [cars, setCars] = useState({ 0:1, 1:9, 2:9, 3:9 })

  const dim2 = (divRef.current) && Math.round(dimensions.min/12);
  const dim = (divRef.current) && Math.round((dimensions.min + dimensions.width + dimensions.height)/50);

  console.log(dimensions, dim, dim2);

  return (
    <div className="App" ref={ divRef }>

      <div>{ Object.values(cars).map((carVal, i) => <span key={i}>{ carVal }</span>) }</div>

      { (divRef.current) &&
        <div className='car-block'>
          { Object.keys(cars).map(carKey => 
            <Carousel key={ carKey } 
              dig={ cars[carKey] } 
              setDig={ (dgt) => setCars({...cars, [carKey]: dgt})} 
              size={ dim }
            />
            )}
        </div>
      }
    </div>
  );
}

export default App;
