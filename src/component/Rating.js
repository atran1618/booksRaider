import style from '../styles/Rating.module.css'

export default function Rating(props) {

    const stars = [];
    // This is kind of complicated and i'm sure there is maybe a better to do this
    // but this is basically how to make the stars filled up with yellow and representing the rating
    for(let i = 1; i <= 5; i++) {
        let starClass ='star';
        if (i <= props.rating) {
            starClass += ' filled';
        }
        if(props.flag) {
            if(starClass !== 'star') {
                stars.push(
                    <span
                        key={i}
                        className={style.test}
                        onClick={() => props.handleRatingChange(i)}
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
                      onClick={() => props.handleRatingChange(i)}
                    >
                       ★
                    </span>
                );
            }
        }
        else {
            if(starClass !== 'star') {
                    stars.push(
                    <span
                         key={i}
                         className={style.test}
                         onClick={() => props.handleRatingChange(i)}
                         onMouseEnter={() => props.setRating(i)}
                          onMouseLeave={() => props.setRating(0)}
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
                      onClick={() => props.handleRatingChange(i)}
                      onMouseEnter={() => props.setRating(i)}
                      onMouseLeave={() => props.setRating(0)}
                    >
                       ★
                    </span>
                );
            }
        }
    }

    return (
        <div className={style.stars}>
            {stars}
        </div>
    )
}