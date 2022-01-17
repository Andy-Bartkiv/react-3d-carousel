import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import cls from './Carousel.module.css';
import { BsCaretDownFill, BsCaretUpFill, BsCaretRightFill, BsCaretLeftFill } from "react-icons/bs";

const Carousel = ({ dig, setDig, isHorizontal, cellCount, size }) => {
    
    const cellSize = size * .99 * 2;
    const sizeStyle = { "--size-var": `${size}px` };
    const rotateFn = isHorizontal ? 'rotateY' : 'rotateX';

    const [val, setVal] = useState(dig);

    const [radius, setRadius] = useState( () =>
        Math.round(( cellSize / 2) / Math.tan( Math.PI / cellCount )));
    
    // creating cells array with digits (0..cellCount)
    const [cells, setCells] = useState([...Array(cellCount).keys()]);
    // Stlyling each individual cell
    const [cellsStyle, setCellsStyle] = useState( cells.map(cell => ({ 
        // background: `hsla(${cell*360/cellCount}, 100%, 50%, 0.99)`,
        transform: `${rotateFn}(${cell*360/cellCount}deg) translateZ(${radius}px)`
        })
    ));
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

    const [styles, setStyles] = useState(
        (!isHorizontal)
        ? { container: cls.container,
            scene: cls.scene,
            btn: cls.btn }
        : { container: `${cls.container} ${cls.horizontal}`,
            scene: `${cls.scene} ${cls.horizontal}`,
            btn: `${cls.btn} ${cls.horizontal}` }
        );


    const visibleCells = [(dig===0) ? cellCount-1 : dig-1, dig, (dig===cellCount-1) ? 0 : dig+1];
    // console.log(visibleCells)

    return (
        <div className={ styles.container }
            style={ sizeStyle }
        >
            <button 
                className={ styles.btn }
                onClick={ () => handleClick(false) }
            >
                { (!isHorizontal) ? <BsCaretUpFill/> : <BsCaretLeftFill/> }
            </button>

            <div className={ styles.scene }>        
                <div 
                    className={ cls.carousel }
                    style={{ transform: roatateCar(val) }}
                >
                    { cells.map((cell, i) =>
                        <div key={ cell } 
                            className={ cls.carousel__cell }
                            style = {{ 
                                // background: cellsStyle[i].background,
                                transform: cellsStyle[i].transform,
                                visibility: (visibleCells.includes(i)) ? 'visible' : 'hidden',
                                // opacity: (i === dig) ? '1' : '.65',
                                // boxShadow: (i === dig) ? 'inset 0 0 .25em orange' : 'none',
                                // textShadow: (i === dig) ? '0 0 .25em orange' : 'none',
                                // display: (visibleCells.includes(i)) ? "flex" : 'none'
                            }}
                        >
                            { cell }
                        </div>
                    )}
                </div>
            </div>

            <button 
                    className={ styles.btn }
                    onClick={ () => handleClick(true) }
            >
                { (!isHorizontal) ? <BsCaretDownFill/> : <BsCaretRightFill/> }
            </button>

        </div>
    )
}

Carousel.defaultProps = {
    isHorizontal: false,
    cellCount: 10,
    size: 70, 
}

export default Carousel;
