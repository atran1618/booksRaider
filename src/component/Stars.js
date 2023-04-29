import style from '../styles/Stars.module.css';

export default function Stars(props) {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        let starClass = 'star';
        if(i <= props.rating) {
            starClass += 'filled';
        }

        if(starClass !== 'star') {
            stars.push(
                <span
                     key={i}
                     className={style.test}
                >   
                   ★
                </span>
            );
        }
        else {
            stars.push(
                <span
                  key={i}
                  className={style.star}
                >
                   ★
                </span>
            );
        }
    }
    return (
        <div className={style.container}>
            {stars}
        </div>
    )
}