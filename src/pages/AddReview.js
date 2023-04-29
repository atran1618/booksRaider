import { Banner } from '../component/Banner';
import Cover from '../component/Cover';
import style from '../styles/AddReview.module.css';
import { useState, useEffect } from 'react';
import Rating from '../component/Rating';
import { Link, useParams, useNavigate } from 'react-router-dom';

import useCheckMobileScreen from '../component/mobile_exclusives/CheckMobile';

export const AddReview = (props) => {
    const isMobile = useCheckMobileScreen();
    const [text, setText] = useState('')
    const [rating, setRating] = useState(0);
    const [flag, setFlag] = useState(false);
    const [bookData, setBookData] = useState([]);
    const [userData, setUserData] = useState([]);

    const [editFlag, setEditFlag] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [reviewData, setReviewData] = useState([]);
    const [textEmpty, setTextEmpty] = useState(false);
    const [ratingError, setRatingError] = useState(false);
    const { bookID, reviewID, userID } = useParams();
    

    const navigate = useNavigate();

    const handleRatingChange = (newRating) => {
        if (newRating !== rating) {
            setRating(0);
            setFlag(false)
        } else {
            setFlag(true)
            setRating(newRating);
        }
    };

    useEffect(() => {

        async function getBookData(bookID) {
            const response = await fetch(`http://localhost:3001/books/${bookID}`)
            const data = await response.json();
            setBookData(data);
        }

        async function getUserData(userID) {
            const response = await fetch(`http://localhost:3001/users/${userID}`)
            const data = await response.json();
            setUserData(data);
        }

        async function getReviewData(reviewID) {
            const response = await fetch(`http://localhost:3001/reviews/${reviewID}`)
            const data = await response.json()
            setEditFlag(true);
            setReviewData(data);
            setText(data.review);
            setRating(data.score);
            setFlag(true);
        }

        getBookData(bookID)
        getUserData(userID)
        if(reviewID !== undefined) {
            getReviewData(reviewID);
        }
    }, [bookID, reviewID, userID])

    async function handleClick(event) {
        event.preventDefault();
        if(text.trim().length === 0) {
            setRatingError(false)
            setTextEmpty(true);
            return
        }
        if(rating === 0) {
            setTextEmpty(false);
            setRatingError(true);
            return
        }

        if(editFlag) {
            //Update the review
            const oldRating = reviewData.score;

            const updatedReview ={
                "score": rating,
                "review": text,
            };

            fetch(`http://localhost:3001/reviews/${reviewData._id}`, {
                method: 'PATCH',
                // The headers is required for it to work
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(updatedReview),
                })

            // Update the book totalScore
            const updatedBook = {
                "totalScore": bookData.totalScore +  rating - oldRating,
            }

            fetch(`http://localhost:3001/books/${bookID}`, {
                method: 'PATCH',
                // The headers is required for it to work
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(updatedBook),
            })
            navigate(`/Review/${userID}/${reviewData._id}`);
            return
        }
        const data = {};
        // Hard code userID for now
        data['userID'] = userID;
        data['review'] = text;
        data["score"] = rating;
        data["bookID"] = bookID;

        // POST the review
        const response = await fetch('http://localhost:3001/reviews', {
            method: 'POST',
            // The headers is required for it to work
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            })

        const reviewID = await response.json();

        const updatedBook = {
            "reviewCount": bookData.reviewCount + 1,
            "totalScore": bookData.totalScore + rating,
            "reviews": [...bookData.reviews, reviewID[reviewID.length - 1]._id]
        };

        // Update the book infromation
        fetch(`http://localhost:3001/books/${bookID}`, {
            method: 'PATCH',
            // The headers is required for it to work
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(updatedBook),
            })

        const updatedUser = {
            "reviewCount": userData.reviewCount + 1,
            "reviews": [...userData.reviews, reviewID[reviewID.length - 1]._id],
        }

        // Update the user information
        fetch(`http://localhost:3001/users/${userData._id}`, {
            method: 'PATCH',
            // The headers is required for it to work
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(updatedUser),
            })

        navigate(`/Review/${userID}/${reviewID[reviewID.length - 1]._id}`);
    }


    if(!isMobile) 
    {
        return (
            <div className={style.whole}>
                <Banner userID={userID}/>
                <div className={style.container}>
                    <div className={style.cover}>
                        <Cover count={1} src={bookData.bookCover} _id={bookID}/>
                    </div>
                    <div className={style.text}>
                        <p>Title: {bookData.title}</p>
                    </div>
                    <Link to={`/Book/${bookID}`}>
                        <button className={style.button}>Back to Book</button>
                    </Link>
                    <div>
                        <form className={style.form} onSubmit={handleClick}>
                            <div className={style.ratingContainer}>
                                <p className={style.rating}>Rating:</p>
                                <Rating rating={rating} flag={flag} setRating={setRating} setFlag={setFlag}
                                  handleRatingChange={handleRatingChange}
                                />
                            </div>
                            <textarea name='review'
                                className={style.review}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder='Review...'
                            ></textarea>
                            <div>
                                <button className={style.publish}
                                onClick={handleClick}>
                                    Publish
                                </button>
                            </div>
                        </form>
                    </div>
                    {textEmpty && (
                        <h3 className={style.error}>Please enter text for the review</h3>
                    )}
                    {ratingError && (
                        <h3 className={style.error}>Please enter a rating</h3>
                    )}
                </div>
            </div>
        )
    }
    return (
        <div>
            <Banner userID={userID}/>
            <div className={style.containermobile}>
            <div id={style.startmobile}></div>
            <div className={style.covermobile}>
                <Cover count={1} src='https://m.media-amazon.com/images/I/51mtQ9IE+GL._SX331_BO1,204,203,200_.jpg'/>
            <div className={style.titlemobile}>
                <p>Title:</p>
                <p>Y / N</p>
            </div>
            </div>
            <div className={style.summarymobile}>
                <p><b>Summary: </b> お前はもう死んでいる。何？キーーーーン</p>
            </div>
            <div id={style.startmobile} ></div>
            <div className={style.text}>
                <p><b>Review Text</b></p>
            </div>
            <div className={style.ratingContainerMobile}>
                <p className={style.ratingmobile}>Rating:</p>
                <Rating rating={rating} flag={flag} setRating={setRating} setFlag={setFlag}
                    handleRatingChange={handleRatingChange}
                />
            </div>
            <textarea name='review'
                className={style.reviewmobile}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder='Review...'
            ></textarea>
            <div>
                <button className={style.publishmobile}><b>Publish</b></button>
            </div>
            <div>
                <button className={style.backButtonMobile}>Back to Book</button>
            </div>
        </div>
    </div>
    )
} 