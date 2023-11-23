import { Banner } from '../component/Banner';
import ForegroundBox from '../component/mobile_exclusives/ForegroundBox';
import PerBookBox from '../component/mobile_exclusives/PerBookBox';
import style from '../styles/Home.module.css';
import UserList from '../component/UserList';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import useCheckMobileScreen from '../component/mobile_exclusives/CheckMobile';

export const SearchBook = (props) => {
    const isMobile = useCheckMobileScreen();
    const [data, setData] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const { userID } = useParams();
    const [users, setUsers] = useState([])

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function getUsers() {
            const response = await fetch(`https://books-raider-backend.onrender.com/users`)
            const data = await response.json();
            setUsers(data);
        }

        getUsers();

        
    }, [])

    const handleChange = (event) => {
        fetch(`https://books-raider-backend.onrender.com/books/${event.target.value}`)
        .then(res => res.json()).then((result) => {
            setData(result);
            setLoadingData (false);
         })    
    };

    function handleSearchInput(event) {
        setSearchTerm(event.target.value);
    }

    async function handleEnterKey(event) {
        if (event.key === 'Enter') {
            const response = await fetch(`https://books-raider-backend.onrender.com/users/${searchTerm}`)
            const data = await response.json();

            setUsers(data);
        }
    }


    if(!isMobile)
    {
        if(!isMobile)
        {
            return (
            <div className={style.test}>
                <Banner userID={userID}/>
                <div className={style.users}>
                        <input type='search'
                        placeholder='Search Reviews' className={style.search}
                        onChange={handleSearchInput}
                        onKeyDown={handleEnterKey}
                        />
                </div>
                <UserList count={users.length} users={users} userID={userID}/>
            </div>
        )}
    }


    let containers = []
    for (let i = 0; i < data.length; i++){ // change to constant (5?) when searching is implemented
        //console.log(loadingData1,loadingData2,loadingData3,loadingData4,loadingData5);
        const content = (loadingData) ? '...loading' : <PerBookBox book = {data[i]}/>;
        containers.push(
        <>
            <div className={style['break']}></div>
            {content}
        </>
        )
    }
    return (
        <div>
            <Banner userID={userID}/>
            
            <ForegroundBox>
                <Link to={`/SearchUser/${userID}`}>
                    <button className='sort'> 
                        Sort
                    </button>
                </Link>
                <input className='search-bar' placeholder='Search by: Book Name' onChange={handleChange}/>
                <div className='container'>{containers}</div>
            </ForegroundBox>
            <style jsx='true'>{`
            .search-bar {
                margin-top: 21px;
                margin-bottom: -2px;
                width: 240px;
                height: 60px;
                margin-left: calc(50% - 92px);
                font-size: 18px;
                position: absolute;
                top: 56px;
                right: 12%;
                z-index: 2;
            }

            .search-bar::placeholder {
                font-size: 18px;
            }

            .sort {
                position: absolute;
                width: 48px;
                height: 48px;
                top: 84px;
                left: 9%;
                z-index: 2;
            }
            .container {
                margin-top: 100px;
            }
            `}
            </style>
        </div>
    )
}