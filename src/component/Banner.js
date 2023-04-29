import style from '../styles/Banner.module.css';
import booksImage from '../public/books.png';
import menuImage from '../public/ListButton.png';
import searchImage from '../public/SearchIcon.svg';
import Profile from './Profile';
import { Link, useNavigate } from 'react-router-dom';

import useCheckMobileScreen from './mobile_exclusives/CheckMobile';
import { useState } from 'react';

//import MediaQuery from 'react-responsive' // npm install react-responsive

export const Banner = (props) => {
    const isMobile = useCheckMobileScreen();
    const [searchTerm, setSearchTerm] = useState('');
    const LinkStyle = {
        textDecoration: 'none',
    }
    const navigate = useNavigate();

    function handleSearchInput(event) {
        setSearchTerm(event.target.value);
    }

    async function handleEnterKey(event) {
        if (event.key === 'Enter') {
            const response = await fetch(`http://localhost:3001/books/${searchTerm}`)
            const data = await response.json();

            navigate(`/Home/${props.userID}`, {state: {searchedBooks: data}})
        }
    }

    if(!isMobile) // instead of <MobileMedia> from reactive-package
    {
        return (
                <div className={style.color}>
                    <div className={style.test}>
                        <Link to={`/Home/${props.userID}`}>
                            <img src={booksImage} className={style.icon} alt='books'/>
                        </Link>
                        <Link to={`/Home/${props.userID}`}>
                            <h2 className={style.left} id='title'>Book Raiders</h2>
                        </Link>
                        <Profile userID={props.userID}/>
                    </div>
                    <div className={style.RContainer}>
                        <Link to={`/Home/${props.userID}`} style={LinkStyle}>
                            <h2  id="left" className={style.right}>Books</h2>
                        </Link>
                        <Link  to={`/Users/${props.userID}`} style={LinkStyle}>
                            <h2 className={style.right}>Community</h2>
                        </Link>
                        <input type='search'
                        placeholder='Search Books' className={style.search}
                        onChange={handleSearchInput}
                        onKeyDown={handleEnterKey}
                        /> 
                    </div>   
                </div>
        )
    }
    return (
        /*Mobile media */
            <div>
                <div id="color" className={style.color}>
                    <div id="inline">
                        <Link to={`/Popup/${props.userID}`}>
                            <button className={style['menu-pop-in']}> 
                                <img src={menuImage}  alt='Menu'/>
                            </button>
                        </Link>
                        <Link to={`/Home/${props.userID}`}>
                            <button className={style['home-page-button']}> 
                                <img src={booksImage} className={style['mobile-icon']}  alt='Home'/>
                            </button>
                        </Link>
                        <Link to={`/Users/${props.userID}`}>
                            <button id="" className={style['search-icon']}> 
                                <img src={searchImage}  alt='Search'/>
                            </button>
                        </Link>
                    </div>
                <style jsx='true'>{`
                    #inline {
                        display: flex;
                        justify-content: center;
                        height: 64px;
                        min-width: 315px;
                    }

                    #color {
                        margin-bottom: 24px;
                    }
                `}
                </style>    
                </div>
                
                    
                </div>
        )
}