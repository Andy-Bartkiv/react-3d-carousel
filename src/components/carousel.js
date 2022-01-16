import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import cls from './Carousel.module.css'

const Carousel = ({ dig, setDig, isHorizontal, cellCount }) => {
    
    const [val, setVal] = useState(dig);

    const rotateFn = isHorizontal ? 'rotateY' : 'rotateX';

    const carRef = useRef();

    const calcRadius = () => {
        // const cellWidth = carRef.current.offsetWidth;
        // const cellHeight = carRef.current.offsetHeight;
        const cellWidth = 206;
        const cellHeight = 136;
        const cellSize = isHorizontal ? cellWidth : cellHeight;
        console.log(cellHeight, cellWidth)
        return Math.round( ( cellSize / 2) / Math.tan( Math.PI / cellCount ) );
    }
    const [radius, setRadius] = useState(calcRadius());

    const initCells = () => [...Array(cellCount).keys()];
    const [cells, setCells] = useState(initCells());

    const initCellsStyle = () => 
        cells.map(cell => { 
            return { 
                background: `hsla(${cell*360/cellCount}, 100%, 50%, 0.8)`,
                transform: `${rotateFn}(${cell*360/cellCount}deg) translateZ(${radius}px)`
            }}
        )
    const [cellsStyle, setCellsStyle] = useState(initCellsStyle());

    const [carTrans, setCarTrans] = useState(`translateZ(${-radius}px) ${rotateFn}(${val/cellCount*-360}deg)`);

    // console.log(cells);
    console.log(cellsStyle);
    // console.log(carTrans)

    function rotateCarousel(val) {
        const angle = (val) / cellCount * -360;
        setCarTrans(`translateZ(${-radius}px) ${rotateFn}(${angle}deg)`)
    }

    function handleClick(fwd = true) {
        const newVal = (fwd) ? val+1 : val-1;
        setVal(newVal);
        setDig(cells[newVal % cellCount])
        rotateCarousel(newVal);
    }

    function changeCarousel() {
        let theta = 360 / cellCount;
        const cellWidth = carRef.offsetWidth;
        const cellHeight = carRef.offsetHeight;
        let  cellSize = isHorizontal ? cellWidth : cellHeight;
        let radius = Math.round( ( cellSize / 2) / Math.tan( Math.PI / cellCount ) );
        // for ( var i=0; i < cells.length; i++ ) {
        //   var cell = cells[i];
        //   if ( i < cellCount ) {
        //     // visible cell
        //     cell.style.opacity = 1;
        //     var cellAngle = theta * i;
        //     cell.style.transform = rotateFn + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)';
        //   } else {
        //     // hidden cell
        //     cell.style.opacity = 0;
        //     cell.style.transform = 'none';
        //   }
        // }
      
        rotateCarousel();
      }

    return (
        <div className={ cls.container }>
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                <button 
                    style={{ fontSize: '1rem', padding:'.25rem' }} 
                    onClick={ () => handleClick(false) }
                >Prev
                </button>
                <button>H / W</button>
                <button 
                    style={{ fontSize: '1rem', padding:'.25rem' }}
                    onClick={ () => handleClick(true) }
                >Next
                </button>
            </div>
            <div className={ cls.scene }>
                <div ref={ carRef } 
                    className={ cls.carousel }
                    style={{ transform: carTrans }}
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
