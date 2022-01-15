import cls from './Carousel.module.css'

const Carousel = () => {
    return (
        <div className={ cls.container }>
            <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                <button style={{ fontSize: '1rem', padding:'.25rem' }}>Prev</button>
                <button>H / W</button>
                <button style={{ fontSize: '1rem', padding:'.25rem' }}>Next</button>
            </div>
            <div className={ cls.scene }>
                <div className={ cls.carousel }>
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
