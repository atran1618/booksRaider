import style from '../styles/ReviewList.module.css';
import Cover from '../component/Cover';
import Reviews from '../component/Reviews';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const ReviewList = (props) => {

    const [reviewsData, setReviewsData] = useState([])
    const [booksData, setBooksData] = useState([]);
    const { userID } = useParams();

    // Transform the reviewsID array into array of review object
    useEffect(() => {
        async function getReviewsData() {
            const reviewPromises = props.reviewsID.map((reviewID) => {
                return fetch(`http://localhost:3001/reviews/${reviewID}`)
                        .then(response => response.json());
            })

            const reviews = await Promise.all(reviewPromises);
            setReviewsData(reviews);
        }

        
        getReviewsData();
    }, [props.reviewsID])
    
    useEffect(() => {
        async function getBooksData() {
            const bookPromises = reviewsData.map((reviewObject) => {
                return fetch(`http://localhost:3001/books/${reviewObject.bookID}`)
                        .then(response => response.json());
            })
            const books = await Promise.all(bookPromises);
            setBooksData(books);
        }
        getBooksData()
    }, [reviewsData])


    return (booksData.map((book, i ) => {
        return (
            <div className={style.container} key={i}>
                <div className={style.book}>
                    <p className={style.title}>{book.title}</p>
                    <div className={style.cover}>
                        <Cover count={1} src={booksData[i].bookCover} _id={book._id} userID={userID}/>
                    </div>
                </div>
                <div className={style.review}>
                    <Reviews count={1} reviews={[reviewsData[i]._id]} currentPage={1} userID={userID}/>
                </div>
            </div>
        )
    })
    )
}