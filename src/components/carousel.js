import { useRef } from 'react';
import cls from './Carousel.module.css'

const Carousel = ({ val, setVal }) => {

    const carRef = useRef();
    // const carousel = document.querySelector('.carousel');
    const cellCount = 9;

    function rotateCarousel() {
        const angle = (val - 1) / cellCount * -360;
        if (carRef.current)
            carRef.current.style.transform = 'translateZ(-288px) rotateY(' + angle + 'deg)';
        console.log(angle);
    }

    function handleClick(fwd = true) {
        setVal((fwd) ? ++val : --val);
        console.log(fwd, val, carRef.current);
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
                <div ref={ carRef } className={ cls.carousel }>
                    <div className={ cls.carousel__cell }>1</div>
                    <div className={ cls.carousel__cell }>2</div>
                    <div className={ cls.carousel__cell }>3</div>
                    <div className={ cls.carousel__cell }>4</div>
                    <div className={ cls.carousel__cell }>5</div>
                    <div className={ cls.carousel__cell }>6</div>
                    <div className={ cls.carousel__cell }>7</div>
                    <div className={ cls.carousel__cell }>8</div>
                    <div className={ cls.carousel__cell }>9</div>
                </div>
            </div>
        </div>
    )
}

export default Carousel;
