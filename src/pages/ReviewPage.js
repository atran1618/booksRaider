import useCheckMobileScreen from '../component/mobile_exclusives/CheckMobile';
import { Banner } from '../component/Banner';
import style from '../styles/ReviewPage.module.css'
import Cover from '../component/Cover';
import star from '../public/Star.svg';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const ReviewPage = (props) =>  {
    const isMobile = useCheckMobileScreen();
    const [reviewData, setReviewData] = useState([]);
    const [bookData, setBookData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [ownReview, setOwnReview] = useState(false);
    const { reviewID, userID } = useParams();

    const navigate = useNavigate();

    const LinkStyle = {
        textDecoration: 'none',
        color: 'black',
    }

    const buttonStyle = {
        textDecoration: 'none',
        background: '#D9D9D9',
        border: '1px solid #000000',
        borderRadius: '40px',
        width: '20%',
        height: '50px',
        fontSize: '20px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
    }

    useEffect(() => {
        async function getReviewData(reviewID) {
            const response = await fetch(`https://books-raider-backend.onrender.com/reviews/${reviewID}`)
            const data = await response.json();
            setReviewData(data); 
        }

        async function getBookData(bookID) {
            const response = await fetch(`https://books-raider-backend.onrender.com/books/${bookID}`)
            const data = await response.json();
            setBookData(data);
        }

        async function getUserData(userID) {
            const response = await fetch(`https://books-raider-backend.onrender.com/users/${userID}`)
            const data = await response.json();
            setUserData(data);
        }

        getReviewData(reviewID)
        getBookData(reviewData.bookID)
        getUserData(reviewData.userID)
    }, [reviewData.bookID, reviewData.userID, reviewID])

    async function handleDelete() {
        // Delete the review by passing reviewID
        const response = await fetch(`https://books-raider-backend.onrender.com/reviews/${reviewID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        const deletedID = await response.json();

        // Update the book information
        
        //This is to remove the reviewID 
        let updatedReviews = bookData.reviews;
        const index = updatedReviews.indexOf(reviewID);
        updatedReviews.splice(index, 1)
        const updatedBook = {
            "reviewCount": bookData.reviewCount - 1,
            "totalScore": bookData.totalScore - deletedID.score,
            "reviews": updatedReviews,
        }

        fetch(`https://books-raider-backend.onrender.com/books/${bookData._id}`, {
            method: 'PATCH',
            // The headers is required for it to work
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(updatedBook),
            })

        // Update the user information
        let userReviews  = userData.reviews;
        const i = userReviews.indexOf(reviewID);
        userReviews.splice(i, 1);
        const updatedUser = {
            "reviewCount": userData.reviewCount - 1,
            "reviews": userReviews,
        }

        fetch(`https://books-raider-backend.onrender.com/users/${userID}`, {
            method: 'PATCH',
            // The headers is required for it to work
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(updatedUser),
        })

        navigate(`/Home/${userID}`);
        return
    }

    useEffect(() => {
        function isReview() {
    
            for (let i = 0; i < userData.reviews.length; i++) {
                if(userData._id === userID) {
                    setOwnReview(true)
                }
            }
        }
        if(userData.reviews !== undefined) {
            console.log(`Testing if the review is ok`)
            isReview();
        }
    }, [userData._id, userData.reviews, userID])
    

    if (!isMobile) 
    {
        return (
            <div>
                <Banner userID={userID}/>
                <div className={style.container}>
                    <div className={style.left}>
                        <div className={style.info}>
                            <div className={style.bookInfo}>
                                <div className={style.cover}>
                                    <Cover count={1} src={bookData.bookCover} _id={bookData._id} userID={userID}/>
                                </div>
                                <h2 className={style.title}>{bookData.title}</h2>
                                <h3>{bookData.author}</h3>
                                <h3>ISBN: {bookData.ISBN}</h3>
                            </div>
                            <div className={style.rateInfo}>
                                <div className={style.rating}>
                                    <img id={style.star} src={star} alt='rating star'/>
                                    <p className={style.number}>{reviewData.score}/5</p>
                                </div>
                                {ownReview ? (
                                    <Link to={`/Profile/${userData._id}`} style={LinkStyle}>
                                        <p className={style.username}>By {userData.username}</p>
                                    </Link>
                                ) : (
                                    <Link to={`/Profile/${userID}/${userData._id}`} style={LinkStyle}>
                                        <p className={style.username}>By {userData.username}</p>
                                    </Link>
                                )}
                            </div>
                        </div>
                        {ownReview && (
                            <div className={style.buttonCont}>
                                <Link to={`/AddReview/${userID}/${bookData._id}/${reviewID}`} style={buttonStyle}>
                                    <button className={style.button}>Edit</button>
                                </Link>
                                    <button className={style.delButton}
                                    onClick={handleDelete}>
                                        Delete
                                    </button>
                            </div>
                        )}
                    </div>
                    <div className={style.right}>
                        <textarea className={style.review} value={reviewData.review} spellCheck='false'></textarea>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <Banner {...props}/>
            <div className={style.containermobile}>
                <div id={style.startmobile}></div>
                <div className={style.covermobile}>
                    <Cover count={1} src='https://m.media-amazon.com/images/I/51mtQ9IE+GL._SX331_BO1,204,203,200_.jpg'/>
                <div className={style.bookInfoMobile}>
                    <p>TITLE</p>
                    <p>AUTHOR</p>
                    <p>01/01/2001</p>
                    <p>ISBN#</p>
                </div>
                </div>
                <div className={style.rateInfoMobile}>
                    <div className={style.rating}>
                        <img id={style.star} src={star} alt='rating star' width = "30px"/>
                        <p className={style.numberMobile}>2/5</p>
                    </div>
                    <p className={style.usernameMobile}>By USERNAME</p>
                </div>
                <textarea className={style.reviewMobile}></textarea>
            </div>
        </div>
    )
}