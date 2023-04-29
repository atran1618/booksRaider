import style from '../styles/Popup.module.css'
import { Link } from 'react-router-dom';

export default function Popup(props) {
    return(
        <div className={style.container}>
            <Link to={`/Profile/${props.userID}`}>
                <button className={style.review}>My Reviews</button>
            </Link>
            <br />
            <Link to='/'>
                <button className={style.logout}>Logout</button>
            </Link>
        </div>
    )
}