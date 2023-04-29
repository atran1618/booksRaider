import style from '../styles/BooksList.module.css';
import Cover from '../component/Cover';
import star from '../public/Star.svg';

export default function BooksList(props) {
    let containers = []
    for (let i = 0; i < props.books.length; i++){
        let score;
        if (props.books[i].reviewCount === 0) {
            score = 0;
        } else {
            score = (props.books[i].totalScore / props.books[i].reviewCount).toFixed(1);
        }

        console.log(`This is the cover src in BooksList: ${props.books[i].BookCover}`)
        containers.push(
        <div className={style.booksContainer} key={i}>
            <div className={style.coverContainer}>
                <Cover count={1} _id={props.books[i]._id} src={props.books[i].bookCover}
                        userID={props.userID}/>
            </div>
            <p id={style.title}>{props.books[i].title}</p>
            <p id={style.author}>Author: {props.books[i].author}</p>
            <p id={style.publisher}>Publisher: {props.books[i].publisher}</p>
            <p id={style.pages}>{props.books[i].pageCount} Pages</p>
            <p id={style.pub}>Date Published: {props.books[i].yearPublished}</p>
            <img id={style.star} src={star} alt='rating star'/>
            <p id={style.rating}>{score}/5</p>
        </div>
        )
    }
    return <div className={style.container}>{containers}</div>
}