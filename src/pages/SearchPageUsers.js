import { Banner } from '../component/Banner';
import ForegroundBox from '../component/mobile_exclusives/ForegroundBox';
import PerUserBox from '../component/mobile_exclusives/PerUserBox';
import style from '../styles/Home.module.css';
import { useState, } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import useCheckMobileScreen from '../component/mobile_exclusives/CheckMobile';

// Made it a seperate page because the non-paged component changing used onform which has been phased out in favor of <Link>
// Instead of solving the issue imma take the lazy route that saves me time because there is next to no difference

export const SearchUser = (props) => {
    const isMobile = useCheckMobileScreen();
    const [data, setData] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const { userID } = useParams();

    const handleChange = (event) => {
        fetch(`http://localhost:3001/users/${event.target.value}`)
        .then(res => res.json()).then((result) => {
            setData(result);
            setLoadingData (false);
         })
    };

    if(!isMobile)
    {
        return<Navigate to={`/Home/${userID}`}/>
    }

    let containers = []
    for (let i = 0; i < data.length; i++){ // change to constant (5?) when searching is implemented
        //console.log(loadingData1,loadingData2,loadingData3,loadingData4,loadingData5);
        const content = (loadingData) ? '...loading' : <PerUserBox book = {data[i]}/>;
        containers.push(
        <>
            <div className={style['break']}></div>
            {content}
        </>
        )
    }
    return (
        <div>
            <Banner userID = {userID}/>
            
            <ForegroundBox>
                <Link to={`/Users/${userID}`}>
                    <button className='sort' > 
                        Sort
                    </button>
                </Link>
                <input className='search-bar' placeholder='Search by: Username'  onChange={handleChange}/>
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