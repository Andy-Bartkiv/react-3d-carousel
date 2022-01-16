import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import CarCells from './CarCells';
import cls from './Carousel.module.css'

const Carousel = ({ dig, setDig, isHorizontal, cellCount }) => {
    
    const cellSize = 136;
    const rotateFn = isHorizontal ? 'rotateY' : 'rotateX';

    const [val, setVal] = useState(dig);

    const [radius, setRadius] = useState( () =>
        Math.round(( cellSize / 2) / Math.tan( Math.PI / cellCount )));
    
    // creating cells array
    const initCells = () => [...Array(cellCount).keys()];
    const [cells, setCells] = useState(initCells());
    // Stlyling each individual cell
    const initCellsStyle = () => 
        cells.map(cell => { 
            return { 
                background: `hsla(${cell*360/cellCount}, 100%, 50%, 0.8)`,
                transform: `${rotateFn}(${cell*360/cellCount}deg) translateZ(${radius}px)`
            }}
        )
    const [cellsStyle, setCellsStyle] = useState(initCellsStyle());

    // Styling cells carousel
    const roatateCar = (val) => `translateZ(${-radius}px) ${rotateFn}(${val/cellCount*-360}deg)`;

    console.log(cellsStyle);

    function handleClick(fwd = true) {
        const newVal = (fwd) ? val+1 : val-1;
        const index = (newVal >= 0)
            ? newVal % cellCount
            : (cellCount + newVal % cellCount ) % cellCount 
        setVal(newVal);
        setDig(cells[index]);
    }

    return (
        <div className={ cls.container }>
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                <button 
                    style={{ fontSize: '1rem', padding:'.25rem' }} 
                    onClick={ () => handleClick(false) }
                >Prev
                </button>
                {/* <button>H / W</button> */}
                <button 
                    style={{ fontSize: '1rem', padding:'.25rem' }}
                    onClick={ () => handleClick(true) }
                >Next
                </button>
            </div>
            <div className={ cls.scene }>            
                <div 
                    className={ cls.carousel }
                    style={{ transform: roatateCar(val) }}
                >
                    { cells.map((cell, i) =>
                        <div key={ cell } 
                            className={ cls.carousel__cell }
                            style = {{ 
                                background: cellsStyle[i].background,
                                transform: cellsStyle[i].transform,
                                // opacity: (i === dig) ? '1' : '0'
                                // opacity: `${1-Math.abs(i-dig)/5}` 
                            }}
                        >
                            { cell }
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

Carousel.defaultProps = {
    isHorizontal: false,
    cellCount: 10,
}

export default Carousel;
