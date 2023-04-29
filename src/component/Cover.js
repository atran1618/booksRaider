import style from '../styles/Cover.module.css'
import { Link } from 'react-router-dom';

export default function Cover(props) {
    if (props.count === 1) {
        return( 
        <Link to={`/Book/${props.userID}/${props._id}`}> 
                <img src={props.src}
                alt='books cover' className={style.cover}/>
        </Link>
        )
    }

    let covers = [];
    for (let i = 0; i < props.count; i++) {
        const path =`/Book/${props.userID}/${props._id[i]}`
        covers.push(
            <Link to={path} key={i}> 
                <img src={props.src[i]}
                alt='books cover' className={style.cover}/>
            </Link>
        );
    }


    return covers

}