import { Banner } from '../component/Banner';
import style from '../styles/Home.module.css';
import add from '../public/add.svg';
import Recent from '../component/Recent';
import BooksList from '../component/BooksList';
import BooksListMobile from '../component/mobile_exclusives/BooksListMobile.js';
import ReviewListMobile from '../component/mobile_exclusives/ReviewListMobile.js';
import ForegroundBox from '../component/mobile_exclusives/ForegroundBox';
import { useState, useEffect } from 'react';
import close from '../public/close.png';
import '../styles/background.css';
import { useParams, useLocation } from 'react-router-dom';
//import { Link } from 'react-router-dom';

import useCheckMobileScreen from '../component/mobile_exclusives/CheckMobile';

export const Home = (props) => {
    const isMobile = useCheckMobileScreen();
    const [books, setBooks ] = useState([]);
    const { userID } = useParams();

    const [ flag, setFlag ] = useState(false);
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [duplicate, setDuplicate] = useState(false);
    const [ recentBooks, setRecentBooks ] = useState([]);
    const baseURL = 'https://www.googleapis.com/books/v1/volumes/';
    const regex = /\/dp\/([\dX]+)/i;

    const [data, setData] = useState(null);
    const [sortState, setSortState] = useState('recent');
    const [loadingData, setLoadingData] = useState(true);

    const location = useLocation();

    // This if to get the all the books in the database
    useEffect(() => {
        fetch('http://localhost:3001/books', {
            method: 'GET',
    
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => {
            if(response.status === 200) {
                return response.json();
           }
        }).then(data => {
            setBooks(data);
            if(data.length >= 2) {
                setRecentBooks(data.slice(-2))
            } else {
                setRecentBooks(data)
            }
        })

        fetch(`http://localhost:3001/users/644b40fc1692279a51d1d49a`)
            .then(res => res.json())
            .then(
                (result) => {
                setData(result);
                setLoadingData (false);
                },
                (error) => {
                    setError(error);
                }
            )
    }, [])

    function popUp() {
        setError(false);
        setFlag(!flag);
        setDuplicate(false);
    }

    function addBook(book) {
        setBooks([...books, book])
        let updatedRecent = []
        updatedRecent.push(recentBooks[1])
        updatedRecent.push(book)
        setRecentBooks(updatedRecent)
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) { // Check if Enter key was pressed
          handleSubmit();
        }
      };

    async function handleSubmit() {
        const match = text.match(regex);
        if (match === null) {
            setError(true);
            return 
        }
        let isbn = match[1];
        let searchURL = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn.toString();

        setLoading(true);

        const response = await fetch(searchURL)
        const data = await response.json();
        let id = data.items[0].id;

        console.log(id)
        let url = baseURL + id;
        console.log(url)

        let coverSrc;
        const bookResponse = await fetch(url)
        const bookData = await bookResponse.json();
        //This is for cases where google book return with html element tags in them
        let description = bookData.volumeInfo.description;
        description = description.replace(/(<br\s*\/?>)/g, '\n').replace(/<[^>]*>/g, '').replace(/&.*;/g, '');

        //Test if google book return a cover
        if(bookData.volumeInfo.imageLinks === undefined) {
            coverSrc = 'https://drupal.nypl.org/sites-drupal/default/files/blogs/J5LVHEL.jpg'
        }
        else {
            coverSrc = bookData.volumeInfo.imageLinks.thumbnail;
        }

        console.log(`This is the cover src: ${coverSrc}`)

        let title;
        if(bookData.volumeInfo.subtitle !== undefined) {
            title = bookData.volumeInfo.title + ': ' + bookData.volumeInfo.subtitle
        }
        else {
            title = bookData.volumeInfo.title;
        }

        const book = {
            ISBN: isbn,
            title: title,
            author: bookData.volumeInfo.authors[0],
            pageCount: bookData.volumeInfo.pageCount,
            publisher: bookData.volumeInfo.publisher,
            yearPublished: bookData.volumeInfo.publishedDate,
            summary: description,
            reviewCount : 0,
            totalScore: 0,
            reviews: [],
            bookCover: coverSrc
        }

        // Add it to the database
        const result = await fetch ('http://localhost:3001/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book),
        })

        // Check if the book is already in the database
        if (result.status === 500) {
            setDuplicate(true)
            setLoading(false)
            return
        }

        const resultResponse = await result.json();

        setLoading(false)
        setFlag(!flag);
        setError(false)
        addBook(resultResponse)
        setDuplicate(false)
    }

    useEffect(() => {
        if(location.state !== null) {
            const { searchedBooks } = location.state;
            setBooks(searchedBooks)
        }
    }, [location.state])

    if(!isMobile) // instead of <MobileMedia> from reactive-package
    {
        // moved popup to be global so mobile can use it

        return (
        <div className={loading ? style.container : "" }>
            <Banner userID={userID}/>
                <div>
                    <h1 className={style.title}>Books</h1>
                    <img className={style.add} src={add} alt='add button' onClick={popUp}/>
                </div>
                <select className={style.selection}>
                    <option value="option1">Sort by newest</option>
                    <option value="option2">Sort by oldest</option>
                    <option value="option3">Sort by title</option>
                    <option value="option3">sort by rating</option>
                </select>
                <div>
                    <BooksList books={books} userID={userID}/>
                    <Recent books={recentBooks} userID={userID}/>
                </div>
                {flag && (
                <div className={style.linkContainer}> 
                    <img className={style.close} src={close} alt='close button' onClick={popUp}/>
                    {duplicate && (
                        <h3 className={style.error}>The book is in already in the website</h3>
                    )}
                    {error && (
                        <h3 className={style.error}>Please enter a proper Amazon book link or find another Amazon link</h3>
                    )}
                    <h2>Put an Amazon book link here:</h2>
                    <input autoComplete='off' className={style.input} name="link" onChange={(e) => setText(e.target.value)} onKeyDown={handleKeyDown}/>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
                )}
            
        </div>
    )}
    
    if(sortState === 'recent')
    {
        const content = loadingData ? '...loading' : <BooksListMobile user={data}/>;
        console.log("On recents page");
        const handleKeyDown = (e) => {
            if (e.keyCode === 13) { // Check if Enter key was pressed
                console.log("submitted");
                handleSubmit();
            }
          };
        return (
            <div>
                <Banner userID={userID}/>
                <ForegroundBox>
                    <button id='recent' onClick={() => {setSortState('recent')}}>Recent</button>
                    <button id='my-books' onClick={() => {setSortState('myReviews')}}>My Reviews</button>
                    <button id='add' onClick={popUp}>+</button>
                    <div id='start'></div>
                    {content}
                    {flag && (
                    <div className='linkContainer'> 
                        <img className={style.close} src={close} alt='close button' onClick={popUp}/>
                        {duplicate && (
                            <h3 className={style.error}>The book is in already in the website</h3>
                        )}
                        {error && (
                            <h3 className='error'>Please enter a proper Amazon link</h3>
                        )}
                        <h2>Put an Amazon book link here:</h2>
                        <input autoComplete='off' className={style.input} name="link" onChange={(e) => setText(e.target.value)} onKeyDown={handleKeyDown}/>
                        {/*<button onClick={handleSubmit}>Submit</button>*/}
                    </div>
                    )}
                </ForegroundBox>
                <style jsx='true'>{`
                .linkContainer {
                    position: fixed;
                    background: #fff;
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                    border: 1px solid #000000;
                    width: 75%;
                    height: 120px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    top: 40%;
                    left: 15%;
                    border-radius: 10px;
                    font-size: 10px;
                }
                .error {
                    color: red;
                    font-size: 12px;
                    margin-top: 15px;
                    margin-bottom: -5px;
                }
                .BooksListMobile {
                    position: absolute;
                    left: -100px;
                }
                `} </style>
            </div>
        )
    }
    else if(sortState === 'myReviews')
    {
        const content = loadingData ? '...loading' : <ReviewListMobile user={data}/>;
        console.log("On review page");
        const handleKeyDown = (e) => {
            if (e.keyCode === 13) { // Check if Enter key was pressed
                console.log("submitted");
                handleSubmit();
            }
          };
        return (
            <div>
                <Banner userID={userID}/>
                <ForegroundBox>
                    <button id='recent' onClick={() => {setSortState('recent')}}>Recent</button>
                    <button id='my-books' onClick={() => {setSortState('myReviews')}}>My Reviews</button>
                    <button id='add' onClick={popUp}>+</button>
                    <div id='start'></div>
                    {content}
                    {flag && (
                    <div className='linkContainer'> 
                        <img className={style.close} src={close} alt='close button' onClick={popUp}/>
                        {duplicate && (
                            <h3 className={style.error}>The book is in already in the website</h3>
                        )}
                        {error && (
                            <h3 className='error'>Please enter a proper Amazon link</h3>
                        )}
                        <h2>Put an Amazon book link here:</h2>
                        <input autoComplete='off' className={style.input} name="link" onChange={(e) => setText(e.target.value)} onKeyDown={handleKeyDown}/>
                        {/*<button onClick={handleSubmit}>Submit</button>*/}
                    </div>
                    )}
                </ForegroundBox>
                <style jsx='true'>{`
                .linkContainer {
                    position: fixed;
                    background: #fff;
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                    border: 1px solid #000000;
                    width: 75%;
                    height: 120px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    top: 40%;
                    left: 15%;
                    border-radius: 10px;
                    font-size: 10px;
                }
                .error {
                    color: red;
                    font-size: 12px;
                    margin-top: 15px;
                    margin-bottom: -5px;
                }
                .BooksListMobile {
                    position: absolute;
                    left: -100px;
                }
                `} </style>
            </div>
        )
    }
}