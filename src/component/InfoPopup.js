import style from '../styles/InfoPopup.module.css';
import close from '../public/close.png';

export default function InfoPopup(props) {
    return (
        <div className={style.container}>
            <img className={style.close} src={close} alt='close button' onClick={props.handleClick}/>
            <p className={style.author}>Author: {props.book.author}</p>
            <p className={style.text}>Publisher: {props.book.publisher}</p>
            <p className={style.text}>Published: {props.book.yearPublished}</p>
            <p className={style.text}>Pages: {props.book.pageCount}</p>
            <p className={style.text}>ISBN: {props.book.ISBN}</p>
        </div>
    )
}